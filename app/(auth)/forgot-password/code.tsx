import { FormField } from "@/src/components/common/FormField";
import { useVerifyResetCode } from "@/src/hooks/auth/useVerifyResetCode";
import { verifyResetCodeSchema } from "@/src/schemas/auth.schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyResetCodeScreen() {
    const router = useRouter();
    const { mutate: verifyResetCodeMutation, isPending } = useVerifyResetCode();
    const params = useLocalSearchParams<{ email?: string | string[] }>();
    const email = Array.isArray(params.email) ? params.email[0] : params.email ?? "";
    const [code, setCode] = useState("");

    useEffect(() => {
        if (!email) {
            router.replace("/(auth)/forgot-password");
        }
    }, [email, router]);

    const handleSubmit = () => {
        const result = verifyResetCodeSchema.safeParse({ email, code });

        if (!result.success) {
            Alert.alert("Error", result.error.issues[0].message);
            return;
        }

        verifyResetCodeMutation(
            { email: result.data.email, code: result.data.code },
            {
                onSuccess: (response) => {
                    router.push({
                        pathname: "/(auth)/forgot-password/reset-password",
                        params: {
                            email: response.data.email,
                            resetToken: response.data.resetToken,
                        },
                    });
                },
                onError: () => {
                    Alert.alert(
                        "Error",
                        "El código no es válido o expiró. Intenta de nuevo."
                    );
                },
            }
        );
    };

    if (!email) {
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
                                <KeyRound size={32} color="white" />
                            </View>
                            <Text className="mb-2 text-3xl font-bold text-gray-900">Verifica el código</Text>
                            <Text className="text-center text-gray-600">
                                Ingresa el código de 6 dígitos que enviamos a {email}.
                            </Text>
                        </View>

                        <View className="rounded-2xl border border-gray-200 bg-white p-8">
                            <View className="space-y-4">
                                <FormField
                                    label="Código de verificación"
                                    icon={KeyRound}
                                    placeholder="123456"
                                    value={code}
                                    onChangeText={(text) => setCode(text.replace(/\D/g, "").slice(0, 6))}
                                    keyboardType="number-pad"
                                />

                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={isPending}
                                    className="rounded-xl bg-purple-600 py-3 active:bg-purple-700 disabled:opacity-60"
                                >
                                    <Text className="text-center text-base font-semibold text-white">
                                        {isPending ? "Verificando..." : "Verificar código"}
                                    </Text>
                                </Pressable>

                                <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                                    <Text className="text-center text-sm font-medium text-purple-600 pt-4">
                                        Cambiar correo
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