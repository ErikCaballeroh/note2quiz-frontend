import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

import { register } from "@/src/services/auth.service";
import { RegisterRequestDto } from "@/src/types/dto/auth/register.dto";

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterRequestDto) =>
            register(data),
        onSuccess: async (data) => {
            await AsyncStorage.setItem(
                'token',
                data.token
            );
        },
    });
};