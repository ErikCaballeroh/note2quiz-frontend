import { X } from "lucide-react-native";
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

interface CategoryFormModalProps {
    visible: boolean;
    categoryName: string;
    isEditing: boolean;
    onCategoryNameChange: (name: string) => void;
    onClose: () => void;
    onSave: () => void;
}

export const CategoryFormModal = ({
    visible,
    categoryName,
    isEditing,
    onCategoryNameChange,
    onClose,
    onSave,
}: CategoryFormModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable className="flex-1 bg-black/40 justify-center px-5" onPress={onClose}>
                <View className="bg-white rounded-2xl p-5" onStartShouldSetResponder={() => true}>
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-lg font-bold text-gray-900">
                            {isEditing ? "Editar categoría" : "Nueva categoría"}
                        </Text>

                        <TouchableOpacity
                            onPress={onClose}
                            className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                        >
                            <X size={18} color="#374151" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        value={categoryName}
                        onChangeText={onCategoryNameChange}
                        placeholder="Nombre de la categoría"
                        placeholderTextColor="#9CA3AF"
                        className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                        autoFocus
                    />

                    <View className="flex-row gap-3 mt-4">
                        <TouchableOpacity
                            onPress={onClose}
                            className="flex-1 rounded-xl border border-gray-300 py-3 items-center"
                        >
                            <Text className="text-gray-700 font-semibold">Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onSave}
                            className="flex-1 rounded-xl bg-purple-600 py-3 items-center"
                        >
                            <Text className="text-white font-semibold">
                                {isEditing ? "Guardar" : "Crear"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};
