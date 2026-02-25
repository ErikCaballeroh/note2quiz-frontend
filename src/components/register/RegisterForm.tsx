import { Lock, Mail, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { FormField } from "../common/FormField";

interface LoginFormProps {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    onFullNameChange: (text: string) => void;
    onEmailChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
    onConfirmePasswordChange: (text: string) => void;
    onSubmit: () => void;
}

export const RegisterForm = ({
    fullName,
    email,
    password,
    confirmPassword,
    onFullNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmePasswordChange,
    onSubmit,
}: LoginFormProps) => {
    return (
        <View className="rounded-2xl border border-gray-200 bg-white p-8">
            <Text className="mb-6 text-2xl font-bold text-gray-900">Registro</Text>

            <View className="space-y-4">
                {/* FullName Field */}
                <FormField
                    label="Nombre Completo"
                    icon={User}
                    placeholder="Nombres Apellidos"
                    value={fullName}
                    onChangeText={onFullNameChange}
                    keyboardType="default"
                />

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

                {/* CnofirmePassword Field */}
                <FormField
                    label="Contraseña"
                    icon={Lock}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={onConfirmePasswordChange}
                    secureTextEntry
                />


                {/* Login Button */}
                <Pressable
                    onPress={onSubmit}
                    className="rounded-xl bg-purple-600 py-3 active:bg-purple-700"
                >
                    <Text className="text-center font-semibold text-white text-base">Crear Cuenta</Text>
                </Pressable>
            </View>
        </View>
    );
};
