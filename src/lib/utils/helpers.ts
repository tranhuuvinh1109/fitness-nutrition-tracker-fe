import { UserProfileType } from "@/types";

type TargetErrors = {
  main_target?: string;
  main_weight_kg?: string;
  priority?: string;
};

export type ValidationErrors = {
  user_id?: string;
  age?: string;
  gender?: string;
  weight_kg?: string;
  height_cm?: string;
  activity_level?: string;
  bmi?: string;
  target?: TargetErrors;
};

export const validateForm = (data: UserProfileType) => {
  const errors: ValidationErrors = {};

  if (!data.user_id?.trim()) {
    errors.user_id = "User ID không được để trống";
  }

  if (!data.age || data.age <= 0 || data.age > 120) {
    errors.age = "Tuổi không hợp lệ";
  }

  if (!data.weight_kg || data.weight_kg <= 0) {
    errors.weight_kg = "Cân nặng phải lớn hơn 0";
  }

  if (!data.height_cm || data.height_cm <= 0) {
    errors.height_cm = "Chiều cao phải lớn hơn 0";
  }

  if (!data.activity_level) {
    errors.activity_level = "Vui lòng chọn mức độ hoạt động";
  }

  const targetErrors: TargetErrors = {};

  if (!data.target?.daily_calories) {
    targetErrors.main_target = "Vui lòng chọn lượng calo tiêu thụ mỗi ngày";
  }

  if (!data.target?.target_weight || data.target.target_weight <= 0) {
    targetErrors.main_weight_kg = "Cân nặng mục tiêu phải lớn hơn 0";
  }

  if (!data.target?.goal) {
    targetErrors.priority = "Vui lòng chọn mục tiêu";
  }

  if (Object.keys(targetErrors).length > 0) {
    errors.target = targetErrors;
  }

  return errors;
};
