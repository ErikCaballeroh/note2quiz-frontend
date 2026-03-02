import { LoginHeader, RegisterLink } from "@/src/components/login";
import { LoginForm } from "@/src/components/login/LoginForm";
import { useLogin } from "@/src/hooks/auth/useLogin";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const router = useRouter();

    const { mutate: loginMutation } = useLogin();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleLogin = (): void => {
        loginMutation(
            {
                email,
                password
            },
            {
                onSuccess: () => {
                    router.replace("/(tabs)");
                },
                onError: () => {
                    Alert.alert(
                        "Error",
                        "Usuario o cotraseña incorrectos. Por favor, inténtalo de nuevo."
                    );
                }
            }
        );
    };

    const handleForgotPassword = (): void => {
        // Implementar lógica para recuperar contraseña
        console.log("Olvidé mi contraseña");
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView contentContainerClassName="flex-1 justify-center px-4 py-8">
                <View className="w-full">
                    <LoginHeader />
                    <LoginForm
                        email={email}
                        password={password}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onSubmit={handleLogin}
                        onForgotPassword={handleForgotPassword}
                    />
                    <RegisterLink />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;