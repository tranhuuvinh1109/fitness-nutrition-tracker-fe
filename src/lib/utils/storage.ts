import {
  UserProfile,
  FoodEntry,
  WorkoutEntry,
  WaterLog,
  DailyStats,
  CalorieRequirements,
} from "../../types";
import { getCurrentUser } from "./auth";

const getStorageKey = (baseKey: string): string => {
  const user = getCurrentUser();
  return user ? `${baseKey}_${user.id}` : baseKey;
};

const STORAGE_KEYS = {
  USER_PROFILE: "fitness_user_profile",
  FOOD_ENTRIES: "fitness_food_entries",
  WORKOUT_ENTRIES: "fitness_workout_entries",
  WATER_LOGS: "fitness_water_logs",
};

// User Profile
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(getStorageKey(STORAGE_KEYS.USER_PROFILE), JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.USER_PROFILE));
  return data ? JSON.parse(data) : null;
};

// Food Entries
export const saveFoodEntry = (entry: FoodEntry): void => {
  const entries = getFoodEntries();
  entries.push(entry);
  localStorage.setItem(getStorageKey(STORAGE_KEYS.FOOD_ENTRIES), JSON.stringify(entries));
};

export const getFoodEntries = (): FoodEntry[] => {
  const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.FOOD_ENTRIES));
  return data ? JSON.parse(data) : [];
};

export const deleteFoodEntry = (id: string): void => {
  const entries = getFoodEntries();
  const filtered = entries.filter((entry) => entry.id !== id);
  localStorage.setItem(getStorageKey(STORAGE_KEYS.FOOD_ENTRIES), JSON.stringify(filtered));
};

// Workout Entries
export const saveWorkoutEntry = (entry: WorkoutEntry): void => {
  const entries = getWorkoutEntries();
  entries.push(entry);
  localStorage.setItem(getStorageKey(STORAGE_KEYS.WORKOUT_ENTRIES), JSON.stringify(entries));
};

export const getWorkoutEntries = (): WorkoutEntry[] => {
  const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.WORKOUT_ENTRIES));
  return data ? JSON.parse(data) : [];
};

export const deleteWorkoutEntry = (id: string): void => {
  const entries = getWorkoutEntries();
  const filtered = entries.filter((entry) => entry.id !== id);
  localStorage.setItem(getStorageKey(STORAGE_KEYS.WORKOUT_ENTRIES), JSON.stringify(filtered));
};

// Water Logs
export const saveWaterLog = (log: WaterLog): void => {
  const logs = getWaterLogs();
  logs.push(log);
  localStorage.setItem(getStorageKey(STORAGE_KEYS.WATER_LOGS), JSON.stringify(logs));
};

export const getWaterLogs = (): WaterLog[] => {
  const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.WATER_LOGS));
  return data ? JSON.parse(data) : [];
};

export const getFoodEntriesByDate = (date: string): FoodEntry[] => {
  const entries = getFoodEntries();
  return entries.filter((entry) => entry.date === date);
};

export const getWorkoutEntriesByDate = (date: string): WorkoutEntry[] => {
  const entries = getWorkoutEntries();
  return entries.filter((entry) => entry.date === date);
};

export const getWaterLogsByDate = (date: string): WaterLog[] => {
  const logs = getWaterLogs();
  return logs.filter((log) => log.date === date);
};

// Daily Stats
export const getDailyStats = (date: string): DailyStats => {
  const foodEntries = getFoodEntriesByDate(date);
  const workoutEntries = getWorkoutEntriesByDate(date);
  const waterLogs = getWaterLogsByDate(date);

  const caloriesIn = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const protein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const carbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const fat = foodEntries.reduce((sum, entry) => sum + entry.fat, 0);

  const caloriesOut = workoutEntries.reduce((sum, entry) => sum + entry.caloriesBurned, 0);
  const workoutMinutes = workoutEntries.reduce((sum, entry) => sum + entry.duration, 0);

  const water = waterLogs.reduce((sum, log) => sum + log.amount, 0);

  return {
    date,
    caloriesIn,
    caloriesOut,
    protein,
    carbs,
    fat,
    water,
    workoutMinutes,
  };
};

// Get stats for date range
export const getStatsForDateRange = (startDate: Date, endDate: Date): DailyStats[] => {
  const stats: DailyStats[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    stats.push(getDailyStats(dateStr));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return stats;
};

// Get weight history (simulate from profile changes)
export const getWeightHistory = (): { date: string; weight: number }[] => {
  // In a real app, this would track weight changes over time
  // For now, return mock data
  const profile = getUserProfile();
  if (!profile) return [];

  const history = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Simulate gradual weight change
    const variance = (Math.random() - 0.5) * 2;
    history.push({
      date: date.toISOString().split("T")[0],
      weight: profile.weight + variance,
    });
  }

  return history;
};
