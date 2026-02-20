import { useRouter } from "expo-router";
import { ArrowLeft, Filter, Search } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface SavedHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const SavedHeader = ({ searchQuery, onSearchChange }: SavedHeaderProps) => {
    const router = useRouter();

    return (
        <View className="bg-white border-b border-gray-200 px-4 pt-3 pb-4">
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity
                    onPress={() => router.push("/")}
                    className="w-10 h-10 items-center justify-center rounded-xl"
                >
                    <ArrowLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Mis Cuestionarios</Text>
                <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-xl">
                    <Filter size={24} color="#374151" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center border border-gray-300 rounded-xl px-3 bg-white">
                <Search size={20} color="#9CA3AF" />
                <TextInput
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    placeholder="Buscar cuestionarios..."
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 pl-2 py-3 text-sm text-gray-900"
                />
            </View>
        </View>
    );
};
