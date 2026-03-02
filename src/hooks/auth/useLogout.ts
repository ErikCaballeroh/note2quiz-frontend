import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await AsyncStorage.removeItem('token');
        },
        onSuccess: () => {
            queryClient.clear();
            router.replace('/(auth)/login');
        }
    });
};