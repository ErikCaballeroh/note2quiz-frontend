import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface CategoryTabsProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({
    categories,
    selectedCategory,
    onCategoryChange,
}: CategoryTabsProps) => {
    return (
        <View className="px-4 py-3">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex-row gap-2 bg-white border border-gray-200 rounded-xl p-2"
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-purple-600" : ""
                            }`}
                    >
                        <Text
                            className={`text-sm font-semibold ${selectedCategory === category
                                    ? "text-white"
                                    : "text-gray-600"
                                }`}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
