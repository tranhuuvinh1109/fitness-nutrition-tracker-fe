"use client";
import React from "react";

import {
  Flame,
  Target,
  TrendingDown,
  TrendingUp,
  Droplet,
  Clock,
  Apple,
  Dumbbell,
} from "lucide-react";
import { DailyStats, CalorieRequirements, UserProfile } from "@/types";
import { getDailyStats } from "@/lib/utils/storage";
import { calculateCalorieRequirements } from "@/lib/utils/calculations";
import {
  Button,
  Progress,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { generateMotivationalMessage } from "@/lib/utils/aiCoach";
import Link from "next/link";

export function HomePage() {
  const profile: UserProfile = {
    id: "user123",
    age: 28,
    gender: "male",
    weight: 75,
    height: 180,
    activityLevel: "sedentary",
    goal: "lose-weight",
    createdAt: "",
    updatedAt: "",
  };
  const today = new Date().toISOString().split("T")[0];
  const [stats, setStats] = React.useState<DailyStats>(getDailyStats(today));
  const [requirements, setRequirements] = React.useState<CalorieRequirements>(
    calculateCalorieRequirements(profile)
  );

  React.useEffect(() => {
    // Refresh stats every minute
    const interval = setInterval(() => {
      setStats(getDailyStats(today));
    }, 60000);

    return () => clearInterval(interval);
  }, [today]);

  const caloriesRemaining = requirements.targetCalories - stats.caloriesIn + stats.caloriesOut;
  const caloriesProgress =
    ((stats.caloriesIn - stats.caloriesOut) / requirements.targetCalories) * 100;
  const proteinProgress = (stats.protein / requirements.proteinGrams) * 100;
  const waterProgress = (stats.water / 2500) * 100; // Target 2.5L

  const motivationMessage = generateMotivationalMessage(profile, stats);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Bảng điều khiển</h1>
        <p className="text-muted-foreground">
          Chào {profile.gender === "male" ? "anh" : "chị"}! {motivationMessage}
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Calo còn lại</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{Math.max(0, Math.round(caloriesRemaining))}</div>
            <p className="text-muted-foreground text-xs">
              Mục tiêu: {requirements.targetCalories} kcal
            </p>
            <Progress value={Math.min(100, Math.max(0, caloriesProgress))} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Protein</CardTitle>
            <Apple className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{Math.round(stats.protein)}g</div>
            <p className="text-muted-foreground text-xs">Mục tiêu: {requirements.proteinGrams}g</p>
            <Progress value={Math.min(100, proteinProgress)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Nước uống</CardTitle>
            <Droplet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{(stats.water / 1000).toFixed(1)}L</div>
            <p className="text-muted-foreground text-xs">Mục tiêu: 2.5L</p>
            <Progress value={Math.min(100, waterProgress)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Vận động</CardTitle>
            <Dumbbell className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.workoutMinutes} phút</div>
            <p className="text-muted-foreground text-xs">Đốt cháy: {stats.caloriesOut} kcal</p>
            <Progress value={Math.min(100, (stats.workoutMinutes / 60) * 100)} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Calorie Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Cân bằng Calo hôm nay</CardTitle>
          <CardDescription>Tổng quan về calo nạp vào và tiêu thụ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Calo nạp vào</span>
              </div>
              <span className="text-xl">{stats.caloriesIn} kcal</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span>Calo đốt cháy</span>
              </div>
              <span className="text-xl">{stats.caloriesOut} kcal</span>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                <span>Chênh lệch</span>
              </div>
              <span className="text-xl">{stats.caloriesIn - stats.caloriesOut} kcal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macros Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Dinh dưỡng hôm nay</CardTitle>
          <CardDescription>Phân bổ Protein, Carbs, Fat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span>Protein</span>
                <span>
                  {Math.round(stats.protein)}g / {requirements.proteinGrams}g
                </span>
              </div>
              <Progress value={Math.min(100, proteinProgress)} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span>Carbs</span>
                <span>
                  {Math.round(stats.carbs)}g / {requirements.carbsGrams}g
                </span>
              </div>
              <Progress
                value={Math.min(100, (stats.carbs / requirements.carbsGrams) * 100)}
                className="h-2"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span>Fat</span>
                <span>
                  {Math.round(stats.fat)}g / {requirements.fatGrams}g
                </span>
              </div>
              <Progress
                value={Math.min(100, (stats.fat / requirements.fatGrams) * 100)}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href={"nutrition"}
          className="hover:border-primary bg-card text-card-foreground flex cursor-pointer flex-col gap-6 rounded-xl border transition-colors"
        >
          <CardHeader>
            <CardTitle>Ghi nhận bữa ăn</CardTitle>
            <CardDescription>Thêm món ăn bằng AI hoặc tìm kiếm</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Apple className="mr-2 h-4 w-4" />
              Thêm món ăn
            </Button>
          </CardContent>
        </Link>

        <Link
          href={"workout"}
          className="hover:border-primary bg-card text-card-foreground flex cursor-pointer flex-col gap-6 rounded-xl border transition-colors"
        >
          <CardHeader>
            <CardTitle>Ghi nhận tập luyện</CardTitle>
            <CardDescription>Thêm hoạt động thể chất</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Dumbbell className="mr-2 h-4 w-4" />
              Thêm bài tập
            </Button>
          </CardContent>
        </Link>
      </div>
    </div>
  );
}
