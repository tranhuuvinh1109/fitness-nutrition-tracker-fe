"use client";

import { useGetAllWorkouts, useWorkoutSuggestions } from "@/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import dayjs from "dayjs";
import { E_WORKOUT_STATUS } from "@/enums";
import { useApp } from "@/providers";
import {
  Calendar,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Plus,
  RefreshCw,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import { toast } from "sonner";
import { getStatusColor, getStatusLabel } from "@/lib/utils/calculations";
import { useRouter } from "next/navigation";
dayjs.extend(isoWeek);

export function WorkoutTracker() {
  const startDay = dayjs().startOf("isoWeek").format("YYYY-MM-DD"); // Thứ 2
  const endDay = dayjs().endOf("isoWeek").format("YYYY-MM-DD"); // Chủ nhật

  const router = useRouter();

  const { data: workoutLogsData, refetch } = useGetAllWorkouts({
    start_day: startDay,
    end_day: endDay,
  });

  const { mutate: generateWorkoutSuggestions, isPending: isPendingGenrate } =
    useWorkoutSuggestions();
  const { user } = useApp();

  const handleGeneratePlan = () => {
    if (!user?.profile?.activity_level) {
      router.push("/profile");
      toast.error("Vui lòng điền thông tin");
      return;
    }
    generateWorkoutSuggestions(undefined, {
      onSuccess: (data) => {
        console.log("--->", data);
        toast.success("Đã tạo kế hoạch tập luyện!");
        refetch();
      },
      onError: (err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra khi tạo kế hoạch");
      },
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateStr === today.toISOString().split("T")[0]) {
      return "Hôm nay";
    } else if (dateStr === tomorrow.toISOString().split("T")[0]) {
      return "Ngày mai";
    } else {
      return date.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
      });
    }
  };

  const { totalTime, totalCalo, totalWorkout } = useMemo(() => {
    if (!workoutLogsData || workoutLogsData.length === 0) {
      return {
        totalTime: 0,
        totalCalo: 0,
        totalWorkout: 0,
      };
    }

    return workoutLogsData.reduce(
      (acc, item) => {
        acc.totalTime += item.duration_min ?? 0;
        acc.totalCalo += item.calories_burned ?? 0;
        acc.totalWorkout += 1;
        return acc;
      },
      {
        totalTime: 0,
        totalCalo: 0,
        totalWorkout: 0,
      }
    );
  }, [workoutLogsData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Nhật ký luyện tập theo tuần</h1>
          <p className="text-muted-foreground">Theo dõi hoạt động thể chất và calo đốt cháy</p>
        </div>

        {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm bài tập
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm bài tập</DialogTitle>
              <DialogDescription>Ghi lại hoạt động thể chất của bạn</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Loại bài tập</Label>
                <Select value={workoutType} onValueChange={setWorkoutType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tên bài tập</Label>
                <Input
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  placeholder="Ví dụ: Chạy buổi sáng, Tập ngực..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Thời gian (phút)</Label>
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cường độ</Label>
                  <Select value={intensity} onValueChange={(v: any) => setIntensity(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Nhẹ</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú (tùy chọn)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Cảm nhận, số lượng set/rep..."
                  rows={3}
                />
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm">
                  Ước tính đốt cháy: <span className="font-semibold">{0} kcal</span>
                </p>
              </div>

              <Button onClick={handleAdd} className="w-full">
                Thêm bài tập
              </Button>
            </div>
          </DialogContent>
        </Dialog> */}
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tổng thời gian</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalTime} phút</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Calo đốt cháy</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalCalo} kcal</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Số bài tập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalWorkout}</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Workout Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kế hoạch tập luyện đề xuất</CardTitle>
              <CardDescription>Được cá nhân hóa dựa trên mục tiêu của bạn</CardDescription>
            </div>
            {!workoutLogsData?.length && (
              <Button onClick={handleGeneratePlan} disabled={isPendingGenrate} className="gap-2">
                {isPendingGenrate ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Tạo với AI
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isPendingGenrate ? (
            <div className="space-y-4 py-12 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <RefreshCw className="text-primary h-12 w-12 animate-spin" />
                  <Sparkles className="text-chart-1 absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
                </div>
              </div>
              <div>
                <p className="font-semibold">AI đang phân tích hồ sơ của bạn...</p>
                <p className="text-muted-foreground mt-2 text-sm whitespace-pre-line">
                  {/* {getWorkoutPlanSummary(profile)} */}
                </p>
              </div>
            </div>
          ) : workoutLogsData?.length === 0 ? (
            <div className="space-y-4 py-12 text-center">
              <div className="flex justify-center">
                <div className="from-primary/10 to-chart-1/10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br">
                  <Sparkles className="text-primary h-8 w-8" />
                </div>
              </div>
              <div>
                <p className="font-semibold">Chưa có kế hoạch tập luyện</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Nhấn "Tạo với AI" để nhận kế hoạch tập luyện 7 ngày được cá nhân hóa
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="from-primary/5 to-chart-1/5 border-primary/10 flex items-center gap-2 rounded-lg border bg-gradient-to-r p-4">
                <Sparkles className="text-chart-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">
                    Kế hoạch 7 ngày được AI tạo từ {dayjs(startDay).format("DD-MM")} tới{" "}
                    {dayjs(endDay).format("DD-MM")}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {workoutLogsData?.length} bài tập • Mục tiêu:{" "}
                    {user?.profile?.target?.goal === "lose-weight"
                      ? "Giảm cân"
                      : user?.profile?.target?.goal === "gain-muscle"
                        ? "Tăng cơ"
                        : "Duy trì"}
                  </p>
                </div>
              </div>

              {/* Workouts by Date */}
              <div className="space-y-4">
                {workoutLogsData?.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="bg-background sticky top-0 flex items-center gap-2 py-2">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <h4 className="font-semibold">{formatDate(item.log_date)}</h4>
                      <span className="text-muted-foreground text-sm">
                        (
                        {new Date(item.log_date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                        )
                      </span>
                    </div>

                    <Card className="border-l-primary/30 border-l-4">
                      <CardContent className="p-4">
                        <div>
                          <div className="mb-3 flex items-start justify-between">
                            <div className="flex-1">
                              <div className="mb-1 flex items-center gap-2">
                                <h4>{item.workout_metadata.name}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {item.workout_type}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground text-sm">{item.note}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(item.status)} border whitespace-nowrap`}
                            >
                              {item.status === E_WORKOUT_STATUS.PLANNED && (
                                <Circle className="mr-1 h-3 w-3" />
                              )}
                              {item.status === E_WORKOUT_STATUS.COMPLETED && (
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                              )}
                              {item.status === E_WORKOUT_STATUS.SKIPPED && (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {getStatusLabel(item.status)}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-muted-foreground flex gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{item.duration_min} phút</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Flame className="h-3.5 w-3.5 text-orange-500" />
                                <span>{item.calories_burned} kcal</span>
                              </div>
                            </div>

                            {item.status === E_WORKOUT_STATUS.PLANNED && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  //   onClick={() =>
                                  //     handleUpdateWorkoutStatus(
                                  //       workout.id,
                                  //       log.id,
                                  //       E_WORKOUT_STATUS.COMPLETED
                                  //     )
                                  //   }
                                  className="h-8 gap-1"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Hoàn thành
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  //   onClick={() =>
                                  //     handleUpdateWorkoutStatus(
                                  //       workout.id,
                                  //       log.id,
                                  //       E_WORKOUT_STATUS.SKIPPED
                                  //     )
                                  //   }
                                  className="h-8 gap-1"
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Bỏ qua
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
