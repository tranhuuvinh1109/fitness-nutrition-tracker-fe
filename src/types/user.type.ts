export type UserInfoType = {
  id?: string;
  name: string;
  email: string;
  profile: UserProfileType | null;
  role: number;
  created_at?: string;
};

export type UserProfileType = {
  user_id: string;
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  activity_level: string;
  updated_at?: string;
  bmi: string;
  target: {
    daily_calories: number;
    goal: string;
    target_weight: number;
    weekly_workout_days: number;
  };
};
