import { Lock, Mail } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { FormField } from "../common/FormField";

interface LoginFormProps {
    email: string;
    password: string;
    onEmailChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
    onSubmit: () => void;
    onForgotPassword?: () => void;
}

export const LoginForm = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onForgotPassword,
}: LoginFormProps) => {
    return (
        <View className="rounded-2xl border border-gray-200 bg-white p-8">
            <Text className="mb-6 text-2xl font-bold text-gray-900">Iniciar Sesión</Text>

            <View className="space-y-4">
                {/* Email Field */}
                <FormField
                    label="Correo Electrónico"
                    icon={Mail}
                    placeholder="tu@email.com"
                    value={email}
                    onChangeText={onEmailChange}
                    keyboardType="email-address"
                />

                {/* Password Field */}
                <FormField
                    label="Contraseña"
                    icon={Lock}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={onPasswordChange}
                    secureTextEntry
                />

                {/* Forgot Password */}
                <View className="mb-4 items-end">
                    <Pressable onPress={onForgotPassword}>
                        <Text className="text-sm text-purple-600">¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                </View>

                {/* Login Button */}
                <Pressable
                    onPress={onSubmit}
                    className="rounded-xl bg-purple-600 py-3 active:bg-purple-700"
                >
                    <Text className="text-center font-semibold text-white text-base">Iniciar Sesión</Text>
                </Pressable>
            </View>
        </View>
    );
};
