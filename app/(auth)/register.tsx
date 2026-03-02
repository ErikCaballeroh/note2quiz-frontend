import { LoginLink } from '@/src/components/register/LoginLink'
import { RegisterForm } from '@/src/components/register/RegisterForm'
import { RegisterHeader } from '@/src/components/register/RegisterHeader'
import { useRegister } from '@/src/hooks/auth/useRegister'
import { registerSchema } from "@/src/schemas/auth.schema"
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = () => {
    const router = useRouter();

    const { mutate: registerMutation } = useRegister();

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = () => {
        const result = registerSchema.safeParse({
            name: fullName,
            email,
            password,
            confirmPassword
        });

        if (!result.success) {
            const firstError =
                result.error.issues[0].message;
            Alert.alert("Error", firstError);
            return;
        }

        registerMutation(
            {
                name: result.data.name,
                email: result.data.email,
                password: result.data.password
            },
            {
                onSuccess: () => {
                    router.replace("/(tabs)");
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