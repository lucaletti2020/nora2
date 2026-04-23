import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const prefs = await prisma.userPreferences.findUnique({
    where: { userId: session.user.id },
  });
  return Response.json(prefs ?? {});
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    age, sex, weightKg, heightCm, bmi,
    medicalConditions, allergies, dietType,
    calorieTarget, proteinTargetG, fibreTargetG, calciumTargetMg,
    dislikedFoods, favoriteFoods, cuisinePreference, goal,
  } = body;

  const prefs = await prisma.userPreferences.upsert({
    where: { userId: session.user.id },
    update: {
      age: age ?? null,
      sex: sex ?? null,
      weightKg: weightKg ?? null,
      heightCm: heightCm ?? null,
      bmi: bmi ?? null,
      medicalConditions: medicalConditions ?? null,
      allergies: allergies ?? null,
      dietType: dietType ?? null,
      calorieTarget: calorieTarget ?? null,
      proteinTargetG: proteinTargetG ?? null,
      fibreTargetG: fibreTargetG ?? null,
      calciumTargetMg: calciumTargetMg ?? null,
      dislikedFoods: dislikedFoods ?? null,
      favoriteFoods: favoriteFoods ?? null,
      cuisinePreference: cuisinePreference ?? null,
      goal: goal ?? null,
    },
    create: {
      userId: session.user.id,
      age: age ?? null,
      sex: sex ?? null,
      weightKg: weightKg ?? null,
      heightCm: heightCm ?? null,
      bmi: bmi ?? null,
      medicalConditions: medicalConditions ?? null,
      allergies: allergies ?? null,
      dietType: dietType ?? null,
      calorieTarget: calorieTarget ?? null,
      proteinTargetG: proteinTargetG ?? null,
      fibreTargetG: fibreTargetG ?? null,
      calciumTargetMg: calciumTargetMg ?? null,
      dislikedFoods: dislikedFoods ?? null,
      favoriteFoods: favoriteFoods ?? null,
      cuisinePreference: cuisinePreference ?? null,
      goal: goal ?? null,
    },
  });

  return Response.json(prefs);
}
