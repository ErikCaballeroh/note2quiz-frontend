import { FormField } from "@/src/components/common/FormField";
import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import { resetPasswordSchema } from "@/src/schemas/auth.schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { mutate: resetPasswordMutation, isPending } = useResetPassword();
    const params = useLocalSearchParams<{ email?: string | string[]; resetToken?: string | string[] }>();
    const email = Array.isArray(params.email) ? params.email[0] : params.email ?? "";
    const resetToken = Array.isArray(params.resetToken) ? params.resetToken[0] : params.resetToken ?? "";
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (!email || !resetToken) {
            router.replace("/(auth)/forgot-password");
        }
    }, [email, resetToken, router]);

    const handleSubmit = () => {
        const result = resetPasswordSchema.safeParse({
            email,
            resetToken,
            newPassword,
            confirmPassword,
        });

        if (!result.success) {
            Alert.alert("Error", result.error.issues[0].message);
            return;
        }

        resetPasswordMutation(
            {
                email: result.data.email,
                resetToken: result.data.resetToken,
                newPassword: result.data.newPassword,
            },
            {
                onSuccess: (response) => {
                    Alert.alert("Contraseña actualizada", response.message, [
                        {
                            text: "Ir a iniciar sesión",
                            onPress: () => router.replace("/(auth)/login"),
                        },
                    ]);
                },
                onError: () => {
                    Alert.alert(
                        "Error",
                        "No pudimos actualizar la contraseña. Inténtalo de nuevo."
                    );
                },
            }
        );
    };

    if (!email || !resetToken) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 px-4 py-4">
                <View className="mb-6 flex-row items-center justify-between">
                    <Pressable onPress={() => router.back()} className="flex-row items-center gap-2">
                        <ArrowLeft size={18} color="#6b7280" />
                        <Text className="text-sm font-medium text-gray-600">Volver</Text>
                    </Pressable>
                    <ShieldCheck size={22} color="#9333ea" />
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    <View className="w-full">
                        <View className="mb-8 items-center">
                            <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-purple-600">
                                <Lock size={32} color="white" />
                            </View>
                            <Text className="mb-2 text-3xl font-bold text-gray-900">Nueva contraseña</Text>
                            <Text className="text-center text-gray-600">
                                Crea una contraseña nueva para {email}.
                            </Text>
                        </View>

                        <View className="rounded-2xl border border-gray-200 bg-white p-8">
                            <View className="space-y-4">
                                <FormField
                                    label="Nueva contraseña"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry
                                />

                                <FormField
                                    label="Repite la contraseña"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                />

                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={isPending}
                                    className="rounded-xl bg-purple-600 py-3 active:bg-purple-700 disabled:opacity-60"
                                >
                                    <Text className="text-center text-base font-semibold text-white">
                                        {isPending ? "Guardando..." : "Actualizar contraseña"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}