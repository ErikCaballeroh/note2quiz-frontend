import { LoginLink } from '@/src/components/register/LoginLink'
import { RegisterForm } from '@/src/components/register/RegisterForm'
import { RegisterHeader } from '@/src/components/register/RegisterHeader'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = (): void => {
        // Mock register - navegar a home
        router.push("/(tabs)");
    }

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