import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

import { login } from "@/src/services/auth.service";
import { LoginRequestDto } from "@/src/types/dto/auth/login.dto";

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginRequestDto) =>
            login(data),
        onSuccess: async (data) => {
            await AsyncStorage.setItem(
                'token',
                data.token
            );
        },
    });
};