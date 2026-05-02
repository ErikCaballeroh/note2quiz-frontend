import {
    CategoryTabs,
    QuizCard,
    SavedHeader,
    StatsSection,
    type Quiz,
} from "@/src/components/saved";
import { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const quizzes: Quiz[] = [
    { id: 1, title: "Historia del Arte", questions: 12, date: "13 Feb 2026", score: 85, category: "Historia" },
    { id: 2, title: "Matemáticas Avanzadas", questions: 15, date: "12 Feb 2026", score: 92, category: "Matemáticas" },
    { id: 3, title: "Biología Celular", questions: 10, date: "10 Feb 2026", score: 78, category: "Ciencias" },
    { id: 4, title: "Literatura Española", questions: 8, date: "9 Feb 2026", score: 88, category: "Literatura" },
    { id: 5, title: "Química Orgánica", questions: 14, date: "8 Feb 2026", score: 81, category: "Ciencias" },
    { id: 6, title: "Geografía Mundial", questions: 11, date: "7 Feb 2026", score: 90, category: "Geografía" },
];

const categories = ["Todos", "Historia", "Matemáticas", "Ciencias", "Literatura", "Geografía"];

const SavedScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todos" || quiz.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                    averageScore="85%"
                    timeThisWeek="4.2h"
                />

                {/* Quizzes List */}
                <View className="px-4 gap-3">
                    <Text className="text-lg font-bold text-gray-900 mb-1">
                        {filteredQuizzes.length} cuestionarios
                    </Text>

                    {filteredQuizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SavedScreen;