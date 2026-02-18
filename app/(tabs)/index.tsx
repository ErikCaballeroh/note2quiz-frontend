import {
    CreateQuizButton,
    HomeHeader,
    QuizData,
    RecentQuizzes,
    StatsCards,
} from "@/src/components/home";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentQuizzes: QuizData[] = [
    { id: 1, title: "Historia del Arte", questions: 12, date: "Hace 2 horas", score: 85 },
    { id: 2, title: "Matemáticas Avanzadas", questions: 15, date: "Ayer", score: 92 },
    { id: 3, title: "Biología Celular", questions: 10, date: "Hace 3 días", score: 78 },
];

interface HomeScreenNavigationType {
    navigate: (screen: string, params?: { id: number }) => void;
}

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationType>();

    const handleLogout = () => {
        Alert.alert("Cerrar sesión", "¿Cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Cerrar sesión",
                style: "destructive",
                onPress: () => navigation.navigate("Login"),
            },
        ]);
    };

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
                        userName="Juan"
                        onProfilePress={() => navigation.navigate("profile")}
                        onSettingsPress={() => navigation.navigate("settings")}
                        onLogoutPress={handleLogout}
                    />

                    {/* Stats Cards */}
                    <View className="px-6 py-6">
                        <StatsCards
                            quizCount={24}
                            averageScore={85}
                            hoursStudied={12}
                        />
                    </View>
                </View>

                {/* Main Content */}
                <View className="px-6 py-6">
                    {/* Create Quiz Button */}
                    <CreateQuizButton
                        onPress={() => navigation.navigate("capture/index")}
                    />

                    {/* Recent Quizzes */}
                    <RecentQuizzes
                        quizzes={recentQuizzes}
                        onQuizPress={(id) => navigation.navigate("QuizPreview", { id })}
                        onViewAllPress={() => navigation.navigate("saved/index")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;