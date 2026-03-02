import { login } from "@/src/services/auth.service";
import { LoginDto } from "@/src/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginDto) =>
            login(data),
        onSuccess: async (data) => {
            await AsyncStorage.setItem(
                'token',
                data.token
            );
        },
    });
};