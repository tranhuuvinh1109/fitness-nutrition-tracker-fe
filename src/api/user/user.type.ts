import { UserInfoType, UserProfileType } from "@/types";
import { ApiReponseType } from "../common.type";

export type RegisterPayloadType = {
  name: string;
  password: string;
  email: string;
};

export type LoginPayloadType = {
  email: string;
  password: string;
};

export type LoginReponseDataType = {
  access_token: string;
  user: UserInfoType;
  refresh_token: string;
};
export type LoginReponseType = ApiReponseType<LoginReponseDataType>;

export type GetUserInfoDataType = {
  access_token: string;
  user: UserInfoType;
  refresh_token: string;
};
export type GetUserInfoReponseType = ApiReponseType<GetUserInfoDataType>;

export type RegisterGuestTokenDataType = {
  data: UserInfoType;
};
export type RegisterGuestTokenReponseType = ApiReponseType<RegisterGuestTokenDataType>;

export type UpdateProfilePayload = UserProfileType;

export type UpdateProfileResponseDataType = UserProfileType;

export type UpgradeResponseDataType = {
  data: {
    access_token: string;
    refresh_token: string;
    user: UserInfoType;
  };
  message: string;
  success: boolean;
};

export type RequestPasswordResetRequestType = {
  email: string;
};

export type VerifyTempPasswordRequestType = {
  email: string;
  temp_password: string;
};

export type ChangePasswordRequestType = {
  email: string;
  new_password: string;
  temp_password: string;
};
