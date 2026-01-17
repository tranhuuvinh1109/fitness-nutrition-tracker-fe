'use client'
import {
  Activity,
  Flame,
  TrendingUp,
} from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { useGetUserInfo, useNutritionAnalytics, useWorkoutAnalytics } from "@/api/user/user.hook";
import dayjs from "dayjs";

export function ProgressTracker() {
  const [timeRange, setTimeRange] = React.useState<"week" | "month">("week");
  const mode = timeRange === "week" ? 7 : 30;

  const { data: userInfo } = useGetUserInfo();
  const { data: nutritionStats } = useNutritionAnalytics(mode);
  const { data: workoutStats } = useWorkoutAnalytics(mode);

  const profile = userInfo?.user.profile;
  const target = profile?.target;

  // Prepare chart data
  const calorieData = nutritionStats?.map((nStat) => {
    const wStat = workoutStats?.find((w) => w.day === nStat.day);
    return {
      date: dayjs(nStat.day).format("DD/MM"),
      "Calo nạp": nStat.calories,
      "Calo đốt": wStat?.calo || 0,
      "Mục tiêu": target?.daily_calories || 2000,
    };
  }) || [];

  const workoutData = workoutStats?.map((stat) => ({
    date: dayjs(stat.day).format("DD/MM"),
    "Phút tập": stat.duration_min,
  })) || [];

  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayStats = nutritionStats?.find((s) => s.day === todayStr) || {
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  };

  const macroData = [
    { name: "Protein", value: todayStats.protein, color: "#10b981" },
    { name: "Carbs", value: todayStats.carbs, color: "#3b82f6" },
    { name: "Fat", value: todayStats.fat, color: "#f59e0b" },
  ];

  const totalCalories = nutritionStats?.reduce((sum, stat) => sum + stat.calories, 0) || 0;
  const totalWorkoutMinutes = workoutStats?.reduce((sum, stat) => sum + stat.duration_min, 0) || 0;
  const averageCalories = Math.round(totalCalories / (nutritionStats?.length || 1));
  const averageWorkout = Math.round(totalWorkoutMinutes / (workoutStats?.length || 1));

  const goalLabels: Record<string, string> = {
    "lose-weight": "Giảm cân",
    "gain-muscle": "Tăng cơ",
    maintain: "Duy trì",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Theo dõi tiến độ</h1>
          <p className="text-muted-foreground">Xem biểu đồ và thống kê chi tiết</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={timeRange === "week" ? "default" : "outline"}
            onClick={() => setTimeRange("week")}
          >
            7 ngày
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            onClick={() => setTimeRange("month")}
          >
            30 ngày
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Calo TB/ngày</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCalories}</div>
            <p className="text-muted-foreground text-xs">Mục tiêu: {target?.daily_calories || "--"} kcal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tập TB/ngày</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageWorkout} phút</div>
            <p className="text-muted-foreground text-xs">Tổng: {totalWorkoutMinutes} phút</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Mục tiêu chính</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalLabels[target?.goal || ""] || "Duy trì"}</div>
            {target?.target_weight && (
              <p className="text-muted-foreground text-xs">Cân nặng mục tiêu: {target.target_weight} kg</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="calories">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calories">Calo</TabsTrigger>
          <TabsTrigger value="workout">Tập luyện</TabsTrigger>
        </TabsList>

        <TabsContent value="calories">
          <Card>
            <CardHeader>
              <CardTitle>Calo hàng ngày</CardTitle>
              <CardDescription>Theo dõi calo nạp vào và đốt cháy</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={calorieData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Calo nạp" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Calo đốt" stroke="#ef4444" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="Mục tiêu"
                    stroke="#6b7280"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workout">
          <Card>
            <CardHeader>
              <CardTitle>Thời gian tập luyện</CardTitle>
              <CardDescription>Số phút tập luyện mỗi ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Phút tập" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  );
}
