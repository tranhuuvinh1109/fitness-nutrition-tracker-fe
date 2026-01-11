import { API_ROUTES } from "@/constants/apiRoute";
import axiosClient from "../axiosInstant";
import { WorkoutLogsReponseDataType, WorkoutLogsReponseType } from "./workout.type";

export const getAllWorkout = async ({
  start_day,
  end_day,
  type,
}: {
  start_day?: string;
  end_day?: string;
  type?: string;
}) => {
  try {
    const response = await axiosClient.get<WorkoutLogsReponseDataType>(API_ROUTES.WORKOUT_LOGS, {
      params: {
        start_day,
        end_day,
        type,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const workoutSuggestions = async () => {
  const response = await axiosClient.post(API_ROUTES.WORKOUT_SUGGESTIONS);
  return response.data;
};
