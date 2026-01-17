import { API_ROUTES } from "@/constants/apiRoute";
import axiosClient from "../axiosInstant";
import {
  CreateNewFoodPayload,
  FoodLogsResponseDataType,
  FoodSuggestionPayload,
  GetAllFoodLogPayload,
} from "./food.type";

export const createFood = async (data: CreateNewFoodPayload) => {
  const response = await axiosClient.post(API_ROUTES.FOODS, { ...data, is_vietnamese: true });
  return response.data;
};

export const getFoodSuggestions = async (data: FoodSuggestionPayload) => {
  const response = await axiosClient.post(API_ROUTES.FOOD_SUGGESTIONS, data);
  return response.data;
};

export const getAllFoodLog = async ({ start_day, end_day }: GetAllFoodLogPayload) => {
  try {
    const response = await axiosClient.get<FoodLogsResponseDataType>(API_ROUTES.FOOD_LOGS, {
      params: {
        start_day,
        end_day,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching food logs:", error);
  }
};
