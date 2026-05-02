import { CategoryDto } from "@/src/types/dto/categories/category.dto";
import { Pencil, Trash2 } from "lucide-react-native";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface CategoryActionMenuModalProps {
    visible: boolean;
    category: CategoryDto | null;
    onClose: () => void;
    onEdit: (category: CategoryDto) => void;
    onDelete: (category: CategoryDto) => void;
}

export const CategoryActionMenuModal = ({
    visible,
    category,
    onClose,
    onEdit,
    onDelete,
}: CategoryActionMenuModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable className="flex-1 bg-black/40 justify-end px-4 pb-6" onPress={onClose}>
                <View className="bg-white rounded-2xl p-4" onStartShouldSetResponder={() => true}>
                    <Text className="text-sm font-semibold text-gray-500 mb-3">
                        {category?.name}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (category) {
                                onEdit(category);
                            }
                        }}
                        className="flex-row items-center gap-3 rounded-xl px-3 py-3 bg-gray-50 mb-2"
                    >
                        <Pencil size={16} color="#374151" />
                        <Text className="text-gray-800 font-semibold">Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => category && onDelete(category)}
                        className="flex-row items-center gap-3 rounded-xl px-3 py-3 bg-red-50"
                    >
                        <Trash2 size={16} color="#DC2626" />
                        <Text className="text-red-600 font-semibold">Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};
