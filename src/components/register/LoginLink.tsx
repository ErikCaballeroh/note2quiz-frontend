import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const LoginLink = () => {
    return (
        <View className="mt-6 flex-row items-center justify-center">
            <Text className="text-gray-600">¿Ya tienes cuenta? </Text>
            <Link href="/(auth)/login" asChild>
                <Pressable onPress={() => router.push("/(auth)/login")}>
                    <Text className="font-semibold text-purple-600">Inicia Sesión</Text>
                </Pressable>
            </Link>
        </View>
    );
};
