import { API_ROUTES } from "@/constants/apiRoute";
import axiosClient from "../axiosInstant";
import {
  ChangePasswordRequestType,
  GetUserInfoDataType,
  LoginPayloadType,
  LoginReponseDataType,
  RegisterGuestTokenDataType,
  RegisterPayloadType,
  RequestPasswordResetRequestType,
  UpgradePayloadType,
  UpgradeResponseDataType,
  VerifyTempPasswordRequestType,
} from "./user.type";

export const getUserInfo = async () => {
  try {
    const response = await axiosClient.get<GetUserInfoDataType>(API_ROUTES.ME);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const login = async (payload: LoginPayloadType) => {
  const response = await axiosClient.post<LoginReponseDataType>(API_ROUTES.LOGIN, payload);
  return response.data;
};

export const register = async (payload: RegisterPayloadType) => {
  const response = await axiosClient.post(API_ROUTES.REGISTER, payload);
  return response.data;
};

// export const upgradeUser = async (payload: UpgradePayloadType) => {
//   const response = await axiosClient.put<UpgradeResponseDataType>(API_ROUTES.UPGRADE, payload);
//   return response.data;
// };

// export const registerGuestToken = async () => {
//   const response = await axiosClient.post<RegisterGuestTokenDataType>(API_ROUTES.GUEST);
//   return response.data;
// };

// export const requestPasswordReset = async (payload: RequestPasswordResetRequestType) => {
//   const response = await axiosClient.post(API_ROUTES.REQUEST_PASSWORD_RESET, payload);
//   return response.data;
// };

// export const verifyPassword = async (payload: VerifyTempPasswordRequestType) => {
//   const response = await axiosClient.post(API_ROUTES.VERIFY_PASSWORD, payload);
//   return response.data;
// };

// export const changePassword = async (payload: ChangePasswordRequestType) => {
//   const response = await axiosClient.post(API_ROUTES.CHANGE_PASSWORD, payload);
//   return response.data;
// };
