import {
    CategoryTabs,
    QuizCard,
    SavedHeader,
    StatsSection,
} from "@/src/components/saved";
import { useUser } from "@/src/hooks/auth/useUser";
import { useSavedQuizzes } from "@/src/hooks/quizzes/useSavedQuizzes";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const { data: userQuery } = useUser();
    const { data: quizzes = [], isLoading, isError } = useSavedQuizzes();

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todos" || quiz.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["Todos", ...new Set(quizzes.map((quiz) => quiz.category))];
    const averageScore = quizzes.length > 0
        ? `${Math.round(quizzes.reduce((total, quiz) => total + quiz.score, 0) / quizzes.length)}%`
        : "0%";

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <SavedHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-28"
                showsVerticalScrollIndicator={false}
            >
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                <StatsSection
                    totalQuizzes={quizzes.length}
                    averageScore={averageScore}
                    hoursStudied={`${userQuery?.hoursStudied || 0}h`}
                />

                {/* Quizzes List */}
                <View className="px-4 gap-3">
                    <Text className="text-lg font-bold text-gray-900 mb-1">
                        {filteredQuizzes.length} cuestionarios
                    </Text>

                    {isLoading ? (
                        <View className="py-10 items-center justify-center">
                            <ActivityIndicator size="small" color="#7C3AED" />
                        </View>
                    ) : isError ? (
                        <Text className="text-gray-500">No se pudieron cargar los cuestionarios</Text>
                    ) : filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))
                    ) : (
                        <Text className="text-gray-500">No hay cuestionarios para mostrar</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SavedScreen;