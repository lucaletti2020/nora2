import { AzureOpenAI } from "openai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getClient() {
  return new AzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION ?? "2024-10-21",
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const plans = await prisma.mealPlan.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true, content: true },
  });
  return Response.json(plans);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { messages, title } = await req.json();
  if (!messages?.length) return Response.json({ error: "No messages provided" }, { status: 400 });

  // Find the last assistant message containing the meal plan
  const planMessages = (messages as { role: string; content: string }[])
    .filter((m) => m.role === "assistant" && m.content.includes("Weekly Nutrient Summary"));
  const planContent = planMessages[planMessages.length - 1]?.content ?? messages[messages.length - 1].content;

  const planTitle = title ?? `Meal Plan – ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;

  // Save the meal plan
  const plan = await prisma.mealPlan.create({
    data: { userId: session.user.id, title: planTitle, content: planContent },
  });

  // Extract and save preferences — must be awaited before response or Vercel kills it
  await extractAndSavePreferences(session.user.id, messages).catch(() => {});

  return Response.json(plan, { status: 201 });
}

async function extractAndSavePreferences(
  userId: string,
  messages: { role: string; content: string }[]
) {
  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Nora"}: ${m.content}`)
    .join("\n\n");

  const response = await getClient().chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT!,
    max_completion_tokens: 512,
    messages: [
      {
        role: "system",
        content: 'Extract user nutrition preferences from this chat. Return ONLY valid JSON with these fields (use null for unknown): {"age":number,"sex":string,"weightKg":number,"heightCm":number,"bmi":number,"medicalConditions":string,"allergies":string,"dietType":string,"calorieTarget":number,"proteinTargetG":number,"fibreTargetG":number,"calciumTargetMg":number,"dislikedFoods":string,"favoriteFoods":string,"cuisinePreference":string,"goal":string}',
      },
      { role: "user", content: conversationText },
    ],
  });

  const text = response.choices[0]?.message?.content ?? "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return;

  const prefs = JSON.parse(jsonMatch[0]);

  await prisma.userPreferences.upsert({
    where: { userId },
    update: {
      age: prefs.age ?? undefined,
      sex: prefs.sex ?? undefined,
      weightKg: prefs.weightKg ?? undefined,
      heightCm: prefs.heightCm ?? undefined,
      bmi: prefs.bmi ?? undefined,
      medicalConditions: prefs.medicalConditions ?? undefined,
      allergies: prefs.allergies ?? undefined,
      dietType: prefs.dietType ?? undefined,
      calorieTarget: prefs.calorieTarget ?? undefined,
      proteinTargetG: prefs.proteinTargetG ?? undefined,
      fibreTargetG: prefs.fibreTargetG ?? undefined,
      calciumTargetMg: prefs.calciumTargetMg ?? undefined,
      dislikedFoods: prefs.dislikedFoods ?? undefined,
      favoriteFoods: prefs.favoriteFoods ?? undefined,
      cuisinePreference: prefs.cuisinePreference ?? undefined,
      goal: prefs.goal ?? undefined,
    },
    create: {
      userId,
      age: prefs.age ?? null,
      sex: prefs.sex ?? null,
      weightKg: prefs.weightKg ?? null,
      heightCm: prefs.heightCm ?? null,
      bmi: prefs.bmi ?? null,
      medicalConditions: prefs.medicalConditions ?? null,
      allergies: prefs.allergies ?? null,
      dietType: prefs.dietType ?? null,
      calorieTarget: prefs.calorieTarget ?? null,
      proteinTargetG: prefs.proteinTargetG ?? null,
      fibreTargetG: prefs.fibreTargetG ?? null,
      calciumTargetMg: prefs.calciumTargetMg ?? null,
      dislikedFoods: prefs.dislikedFoods ?? null,
      favoriteFoods: prefs.favoriteFoods ?? null,
      cuisinePreference: prefs.cuisinePreference ?? null,
      goal: prefs.goal ?? null,
    },
  });
}
