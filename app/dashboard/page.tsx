import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const [prefs, mealPlans] = await Promise.all([
    prisma.userPreferences.findUnique({ where: { userId: session.user.id } }),
    prisma.mealPlan.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, content: true, createdAt: true },
    }),
  ]);

  return (
    <DashboardClient
      userName={session.user.name ?? ""}
      initialPrefs={prefs ? {
        age: prefs.age,
        sex: prefs.sex,
        weightKg: prefs.weightKg,
        heightCm: prefs.heightCm,
        bmi: prefs.bmi,
        medicalConditions: prefs.medicalConditions,
        allergies: prefs.allergies,
        dietType: prefs.dietType,
        calorieTarget: prefs.calorieTarget,
        proteinTargetG: prefs.proteinTargetG,
        fibreTargetG: prefs.fibreTargetG,
        calciumTargetMg: prefs.calciumTargetMg,
        dislikedFoods: prefs.dislikedFoods,
        favoriteFoods: prefs.favoriteFoods,
        cuisinePreference: prefs.cuisinePreference,
        goal: prefs.goal,
      } : null}
      initialPlans={mealPlans.map((p) => ({
        id: p.id,
        title: p.title,
        content: p.content,
        createdAt: p.createdAt.toISOString(),
      }))}
    />
  );
}
