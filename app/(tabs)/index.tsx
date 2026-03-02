import {
    CreateQuizButton,
    HomeHeader,
    RecentQuizzes,
    StatsCards
} from "@/src/components/home";
import { useLogout } from "@/src/hooks/auth/useLogout";
import { useUser } from "@/src/hooks/auth/useUser";
import { useRecentQuizzes } from "@/src/hooks/quizzes/useRecentQuizzes";
import { router } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const { data: userQuery, isLoading } = useUser();
    const { data: recentQuizzesQuery, isLoading: isRecentQuizzesLoading } = useRecentQuizzes();
    const { mutate: logoutMutation } = useLogout();

    const handleLogout = () => {
        Alert.alert("Cerrar sesión", "¿Cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Cerrar sesión",
                style: "destructive",
                onPress: () => logoutMutation(),
            },
        ]);
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-24"
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View>
                    <HomeHeader
                        userName={userQuery?.data.name || "Usuario"}
                        onProfilePress={() => router.push("/profile")}
                        onSettingsPress={() => router.push("/settings")}
                        onLogoutPress={handleLogout}
                    />

                    {/* Stats Cards */}
                    <View className="px-6 py-6">
                        <StatsCards
                            quizCount={userQuery?.data.numQuizzes || 0}
                            averageScore={userQuery?.data.avgScore || 0}
                            hoursStudied={userQuery?.data.hoursStudied || 0}
                        />
                    </View>
                </View>

                {/* Main Content */}
                <View className="px-6 py-6">
                    {/* Create Quiz Button */}
                    <CreateQuizButton
                        onPress={() => router.push("/capture")}
                    />

                    {
                        recentQuizzesQuery
                            ? <Text className="text-gray-500">No hay quizzes recientes</Text>
                            : <RecentQuizzes
                                quizzes={recentQuizzesQuery || []}
                                onQuizPress={(id) => router.push(`/quiz/${id}/preview`)}
                                onViewAllPress={() => router.push("/saved")}
                            />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;