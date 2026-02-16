import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const RegisterLink = () => {
    return (
        <View className="mt-6 flex-row items-center justify-center">
            <Text className="text-gray-600">¿No tienes cuenta? </Text>
            <Link href="/(auth)/register" asChild>
                <Pressable onPress={() => router.push("/(auth)/register")}>
                    <Text className="font-semibold text-purple-600">Regístrate</Text>
                </Pressable>
            </Link>
        </View>
    );
};
