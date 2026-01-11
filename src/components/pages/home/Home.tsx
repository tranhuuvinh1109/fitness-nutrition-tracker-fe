"use client";
import React from "react";

import { Flame, Target, TrendingDown, TrendingUp, Droplet, Apple, Dumbbell } from "lucide-react";
import { CalorieRequirements, UserProfile } from "@/types";
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
  const [requirements, setRequirements] = React.useState<CalorieRequirements>(
    calculateCalorieRequirements(profile)
  );

  const caloriesRemaining = 0;
  const caloriesProgress = 0;
  const proteinProgress = 0;
  const waterProgress = 0;

  const motivationMessage = 0;

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
            <div className="text-2xl">{0}g</div>
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
            <div className="text-2xl">{0}L</div>
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
            <div className="text-2xl">{0} phút</div>
            <p className="text-muted-foreground text-xs">Đốt cháy: {0} kcal</p>
            <Progress value={0} className="mt-2" />
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
              <span className="text-xl">{0} kcal</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span>Calo đốt cháy</span>
              </div>
              <span className="text-xl">{0} kcal</span>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                <span>Chênh lệch</span>
              </div>
              <span className="text-xl">{0} kcal</span>
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
                <span>{0}g</span>
              </div>
              <Progress value={Math.min(100, proteinProgress)} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span>Carbs</span>
                <span>{0}g</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span>Fat</span>
                <span>{0}g</span>
              </div>
              <Progress value={0} className="h-2" />
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
