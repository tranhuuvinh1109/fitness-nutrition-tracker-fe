import { QUERY_KEYS } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  //   changePassword,
  getUserInfo,
  login,
  register,
  updateUserProfile,
  //   registerGuestToken,
  //   requestPasswordReset,
  //   upgradeUser,
  //   verifyPassword,
} from "./user.api";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getUserInfo,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};

// export const useUpgrade = () => {
//   return useMutation({
//     mutationFn: upgradeUser,
//   });
// };

// export const useRequestPasswordReset = () => {
//   return useMutation({
//     mutationFn: requestPasswordReset,
//   });
// };

// export const useVerifyPassword = () => {
//   return useMutation({
//     mutationFn: verifyPassword,
//   });
// };

// export const useChangePassword = () => {
//   return useMutation({
//     mutationFn: changePassword,
//   });
// };
