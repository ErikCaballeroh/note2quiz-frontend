import {
    CategoriesAccordion,
    CategoryActionMenuModal,
    CategoryFormModal,
    CategoryTabs,
    QuizCard,
    SavedHeader,
    StatsSection,
} from "@/src/components/saved";
import { useUser } from "@/src/hooks/auth/useUser";
import { useCategories } from "@/src/hooks/categories/useCategories";
import { useCreateCategory } from "@/src/hooks/categories/useCreateCategory";
import { useDeleteCategory } from "@/src/hooks/categories/useDeleteCategory";
import { useUpdateCategory } from "@/src/hooks/categories/useUpdateCategory";
import { useSavedQuizzes } from "@/src/hooks/quizzes/useSavedQuizzes";
import { CategoryDto } from "@/src/types/dto/categories/category.dto";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const { data: userQuery } = useUser();
    const { data: categoriesQuery = [], isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories();
    const { data: quizzes = [], isLoading, isError } = useSavedQuizzes();
    const { mutate: createCategory } = useCreateCategory();
    const { mutate: updateCategory } = useUpdateCategory();
    const { mutate: deleteCategory } = useDeleteCategory();

    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [isCategoryActionMenuVisible, setIsCategoryActionMenuVisible] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
    const [selectedCategoryAction, setSelectedCategoryAction] = useState<CategoryDto | null>(null);

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todos" || quiz.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["Todos", ...categoriesQuery.map((category) => category.name)];
    const averageScore = quizzes.length > 0
        ? `${Math.round(quizzes.reduce((total, quiz) => total + quiz.score, 0) / quizzes.length)}%`
        : "0%";

    const openCreateCategoryModal = () => {
        setEditingCategory(null);
        setCategoryName("");
        setIsCategoryModalVisible(true);
    };

    const openEditCategoryModal = (category: CategoryDto) => {
        setEditingCategory(category);
        setCategoryName(category.name);
        setIsCategoryModalVisible(true);
    };

    const closeCategoryModal = () => {
        setIsCategoryModalVisible(false);
        setCategoryName("");
        setEditingCategory(null);
    };

    const closeCategoryActionMenu = () => {
        setIsCategoryActionMenuVisible(false);
        setSelectedCategoryAction(null);
    };

    const openCategoryActionMenu = (category: CategoryDto) => {
        setSelectedCategoryAction(category);
        setIsCategoryActionMenuVisible(true);
    };

    const handleSaveCategory = () => {
        const trimmedName = categoryName.trim();

        if (!trimmedName) return;

        if (editingCategory) {
            updateCategory(
                {
                    id: editingCategory.id,
                    data: { name: trimmedName },
                },
                {
                    onSuccess: closeCategoryModal,
                }
            );
            return;
        }

        createCategory(
            { name: trimmedName },
            {
                onSuccess: closeCategoryModal,
            }
        );
    };

    const handleDeleteCategory = (category: CategoryDto) => {
        closeCategoryActionMenu();

        Alert.alert(
            "Eliminar categoría",
            `¿Eliminar "${category.name}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => deleteCategory(category.id),
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <SavedHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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

            <CategoriesAccordion
                isExpanded={isCategoriesExpanded}
                onToggleExpand={() => setIsCategoriesExpanded((value) => !value)}
                categories={categoriesQuery}
                isLoading={isCategoriesLoading}
                isError={isCategoriesError}
                onAddCategory={openCreateCategoryModal}
                onOpenActionMenu={openCategoryActionMenu}
            />

            <View className="px-4">
                <Text className="text-lg font-bold text-gray-900 mb-3">
                    {filteredQuizzes.length} cuestionarios
                </Text>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-4 pb-28"
                showsVerticalScrollIndicator={false}
            >
                {isLoading ? (
                    <View className="py-10 items-center justify-center">
                        <ActivityIndicator size="small" color="#7C3AED" />
                    </View>
                ) : isError ? (
                    <Text className="text-gray-500">No se pudieron cargar los cuestionarios</Text>
                ) : filteredQuizzes.length > 0 ? (
                    <View className="gap-3">
                        {filteredQuizzes.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </View>
                ) : (
                    <Text className="text-gray-500">No hay cuestionarios para mostrar</Text>
                )}
            </ScrollView>

            <CategoryActionMenuModal
                visible={isCategoryActionMenuVisible}
                category={selectedCategoryAction}
                onClose={closeCategoryActionMenu}
                onEdit={(category) => {
                    openEditCategoryModal(category);
                    closeCategoryActionMenu();
                }}
                onDelete={handleDeleteCategory}
            />

            <CategoryFormModal
                visible={isCategoryModalVisible}
                categoryName={categoryName}
                isEditing={editingCategory !== null}
                onCategoryNameChange={setCategoryName}
                onClose={closeCategoryModal}
                onSave={handleSaveCategory}
            />
        </SafeAreaView>
    );
};

export default SavedScreen;