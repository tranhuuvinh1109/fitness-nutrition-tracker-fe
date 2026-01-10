"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { calculateBMI, getBMICategory } from "@/lib/utils/calculations";
import { useApp } from "@/providers";
import { UserProfileType } from "@/types";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";

export function UserProfilePage() {
  const { user } = useApp();
  const [formData, setFormData] = useState<UserProfileType>({
    user_id: "",
    age: 0,
    gender: "male",
    weight_kg: 0,
    height_cm: 0,
    activity_level: "medium",
    bmi: "",
    target: {
      main_target: "",
      main_weight_kg: 0,
      priority: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateField = (field: keyof UserProfileType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateTargetField = (
    field: keyof {
      main_target: string;
      main_weight_kg?: number;
      priority: string;
    },
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const bmi = user?.profile ? calculateBMI(user?.profile.weight_kg, user?.profile.height_cm) : 0;
  useEffect(() => {
    if (user?.profile) {
      setFormData({
        user_id: user?.id ?? "",
        age: user?.profile.age,
        gender: user?.profile.gender,
        weight_kg: user?.profile.weight_kg,
        height_cm: user?.profile.height_cm,
        activity_level: user?.profile.activity_level,
        target: user?.profile.target,
        bmi: `${bmi}`,
      });
    }
  }, [user, bmi]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1>{user?.profile ? "Chỉnh sửa hồ sơ" : "Thiết lập hồ sơ"}</h1>
        <p className="text-muted-foreground">
          Thông tin của bạn giúp chúng tôi tính toán nhu cầu năng lượng chính xác
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Độ tuổi và giới tính</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Tuổi</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateField("age", parseInt(e.target.value))}
                  required
                  min="15"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chỉ số cơ thể</CardTitle>
            <CardDescription>Cân nặng và chiều cao hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Cân nặng (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight_kg}
                  onChange={(e) => updateField("weight_kg", parseFloat(e.target.value))}
                  required
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Chiều cao (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height_cm}
                  onChange={(e) => updateField("height_cm", parseInt(e.target.value))}
                  required
                  min="100"
                  max="250"
                />
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span>Chỉ số BMI:</span>
                <span className="text-xl">
                  {`${bmi} - ${user?.profile ? getBMICategory(bmi) : 0} `}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mức độ vận động</CardTitle>
            <CardDescription>Mức độ hoạt động thể chất hàng tuần</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.activity_level}
              onValueChange={(v) => updateField("activity_level", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Ít vận động (văn phòng)</SelectItem>
                <SelectItem value="light">Nhẹ nhàng (1-2 ngày/tuần)</SelectItem>
                <SelectItem value="medium">Trung bình (3-5 ngày/tuần)</SelectItem>
                <SelectItem value="active">Tích cực (6-7 ngày/tuần)</SelectItem>
                <SelectItem value="very-active">Rất tích cực (vận động viên)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mục tiêu sức khỏe</CardTitle>
            <CardDescription>Bạn muốn đạt được điều gì?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Mục tiêu chính</Label>
              <Select
                value={formData.target.main_target}
                onValueChange={(v) => updateTargetField("main_target", v)}
              >
                <SelectTrigger id="goal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose-weight">Giảm cân</SelectItem>
                  <SelectItem value="gain-muscle">Tăng cơ</SelectItem>
                  <SelectItem value="maintain">Duy trì cân nặng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.target.main_target !== "maintain" && (
              <div className="space-y-2">
                <Label htmlFor="targetWeight">Cân nặng mục tiêu (kg)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={formData.target.main_weight_kg}
                  onChange={(e) => updateTargetField("main_weight_kg", parseFloat(e.target.value))}
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="priority">Ưu tiên tập luyện</Label>
              <Select
                value={formData.target.priority}
                onValueChange={(v) => updateTargetField("priority", v)}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fat-loss">Giảm mỡ</SelectItem>
                  <SelectItem value="muscle-gain">Tăng cơ</SelectItem>
                  <SelectItem value="endurance">Sức bền</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {user?.profile ? "Cập nhật hồ sơ" : "Tạo hồ sơ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
