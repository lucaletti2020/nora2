-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "age" INTEGER,
    "sex" TEXT,
    "weightKg" REAL,
    "heightCm" REAL,
    "bmi" REAL,
    "medicalConditions" TEXT,
    "allergies" TEXT,
    "dietType" TEXT,
    "calorieTarget" INTEGER,
    "proteinTargetG" INTEGER,
    "fibreTargetG" INTEGER,
    "calciumTargetMg" INTEGER,
    "dislikedFoods" TEXT,
    "favoriteFoods" TEXT,
    "cuisinePreference" TEXT,
    "goal" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Weekly Meal Plan',
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");
