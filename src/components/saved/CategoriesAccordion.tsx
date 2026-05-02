import { CategoryDto } from "@/src/types/dto/categories/category.dto";
import { ChevronDown, ChevronUp, MoreVertical, Plus } from "lucide-react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CategoriesAccordionProps {
    isExpanded: boolean;
    onToggleExpand: () => void;
    categories: CategoryDto[];
    isLoading: boolean;
    isError: boolean;
    onAddCategory: () => void;
    onOpenActionMenu: (category: CategoryDto) => void;
}

export const CategoriesAccordion = ({
    isExpanded,
    onToggleExpand,
    categories,
    isLoading,
    isError,
    onAddCategory,
    onOpenActionMenu,
}: CategoriesAccordionProps) => {
    return (
        <View className="px-4 mb-5">
            <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <TouchableOpacity
                    onPress={onToggleExpand}
                    className="flex-row items-center justify-between px-4 py-4"
                    activeOpacity={0.8}
                >
                    <View className="flex-1 pr-3">
                        <Text className="text-base font-bold text-gray-900">Categorías</Text>
                        <Text className="text-xs text-gray-500 mt-0.5">
                            Administra tus categorías.
                        </Text>
                    </View>

                    {isExpanded ? (
                        <ChevronUp size={20} color="#374151" />
                    ) : (
                        <ChevronDown size={20} color="#374151" />
                    )}
                </TouchableOpacity>

                {isExpanded && (
                    <View className="px-4 pb-4">
                        <TouchableOpacity
                            onPress={onAddCategory}
                            className="flex-row items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 mb-3"
                        >
                            <Plus size={16} color="#fff" />
                            <Text className="text-white font-semibold">Nueva categoría</Text>
                        </TouchableOpacity>

                        {isLoading ? (
                            <View className="py-4 items-center justify-center">
                                <ActivityIndicator size="small" color="#7C3AED" />
                            </View>
                        ) : isError ? (
                            <Text className="text-sm text-gray-500">
                                No se pudieron cargar las categorías
                            </Text>
                        ) : categories.length > 0 ? (
                            <View className="gap-2">
                                {categories.map((category) => (
                                    <View
                                        key={category.id}
                                        className="flex-row items-center justify-between rounded-xl border border-gray-200 px-3 py-2.5 bg-gray-50"
                                    >
                                        <Text
                                            className="flex-1 text-sm font-semibold text-gray-800"
                                            numberOfLines={1}
                                        >
                                            {category.name}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => onOpenActionMenu(category)}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 items-center justify-center"
                                        >
                                            <MoreVertical size={14} color="#374151" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text className="text-sm text-gray-500">
                                Todavía no hay categorías creadas.
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};
