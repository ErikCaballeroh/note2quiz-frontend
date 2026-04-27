import { useState } from 'react'

import { Alert, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useRouter } from 'expo-router'

import { LoginLink, RegisterForm, RegisterHeader } from '@/src/components/register'
import { useRegister } from '@/src/hooks/auth/useRegister'
import { registerSchema } from "@/src/schemas/auth.schema"

const RegisterScreen = () => {
    const router = useRouter();

    const { mutate: registerMutation } = useRegister();

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = () => {
    console.log("handleRegister llamado");
    const result = registerSchema.safeParse({
        name: fullName,
        email,
        password,
        confirmPassword
    });

    console.log("resultado schema:", JSON.stringify(result));

    if (!result.success) {
        const firstError = result.error.issues[0].message;
        Alert.alert("Error", firstError);
        return;
    }

    console.log("llamando registerMutation...");
    registerMutation(
        {
            name: result.data.name,
            email: result.data.email,
            password: result.data.password
        },
        {
            onSuccess: () => {
                console.log("registro exitoso");
                router.replace("/(tabs)");
            },
            onError: (error: any) => {
                console.log("error registro:", JSON.stringify(error));
                Alert.alert("Error", error?.message || JSON.stringify(error));
            }
        }
    );
};

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView contentContainerClassName="flex-1 justify-center px-4 py-8">
                <View className="w-full">
                    <RegisterHeader />
                    <RegisterForm
                        fullName={fullName}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        onFullNameChange={setFullName}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onConfirmePasswordChange={setConfirmPassword}
                        onSubmit={handleRegister}
                    />
                </View>
                <LoginLink />
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen