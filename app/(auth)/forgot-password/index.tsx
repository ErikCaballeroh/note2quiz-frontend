import { FormField } from "@/src/components/common/FormField";
import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";
import { forgotPasswordSchema } from "@/src/schemas/auth.schema";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail, ShieldAlert } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const { mutate: forgotPasswordMutation, isPending } = useForgotPassword();
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        const result = forgotPasswordSchema.safeParse({ email });

        if (!result.success) {
            Alert.alert("Error", result.error.issues[0].message);
            return;
        }

        forgotPasswordMutation(
            { email: result.data.email },
            {
                onSuccess: (response) => {
                    Alert.alert("Código enviado", response.message, [
                        {
                            text: "Continuar",
                            onPress: () =>
                                router.push({
                                    pathname: "/(auth)/forgot-password/code",
                                    params: { email: result.data.email },
                                }),
                        },
                    ]);
                },
                onError: () => {
                    Alert.alert(
                        "Error",
                        "No pudimos enviar el código. Inténtalo de nuevo."
                    );
                },
            }
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 px-4 py-4">
                <View className="mb-6 flex-row items-center justify-between">
                    <Pressable onPress={() => router.back()} className="flex-row items-center gap-2">
                        <ArrowLeft size={18} color="#6b7280" />
                        <Text className="text-sm font-medium text-gray-600">Volver</Text>
                    </Pressable>
                    <ShieldAlert size={22} color="#9333ea" />
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    <View className="w-full">
                        <View className="mb-8 items-center">
                            <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-purple-600">
                                <Mail size={32} color="white" />
                            </View>
                            <Text className="mb-2 text-3xl font-bold text-gray-900">Recuperar contraseña</Text>
                            <Text className="text-center text-gray-600">
                                Escribe tu correo y te enviaremos un código de 6 dígitos.
                            </Text>
                        </View>

                        <View className="rounded-2xl border border-gray-200 bg-white p-8">
                            <View className="space-y-4">
                                <FormField
                                    label="Correo electrónico"
                                    icon={Mail}
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />

                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={isPending}
                                    className="mt-2 rounded-xl bg-purple-600 py-3 active:bg-purple-700 disabled:opacity-60"
                                >
                                    <Text className="text-center text-base font-semibold text-white">
                                        {isPending ? "Enviando..." : "Enviar código"}
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