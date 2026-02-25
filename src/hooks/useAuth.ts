import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getMe as getMeAction,
  login as loginAction,
  register as registerAction
} from '../services/auth.service';

import {
  LoginDto,
  RegisterDto
} from '../types/auth.types';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginDto) =>
      loginAction(data),
    onSuccess: async (data) => {
      await AsyncStorage.setItem(
        'token',
        data.token
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterDto) =>
      registerAction(data),
    onSuccess: async (data) => {
      await AsyncStorage.setItem(
        'token',
        data.token
      );
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMeAction,
  });
};