import { register } from "@/src/services/auth.service";
import { RegisterDto } from "@/src/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterDto) =>
            register(data),
        onSuccess: async (data) => {
            await AsyncStorage.setItem(
                'token',
                data.token
            );
        },
    });
};