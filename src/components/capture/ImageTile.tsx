import { X } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ImageTileProps {
    uri: string;
    index: number;
    size: number;
    onRemove: () => void;
}

export const ImageTile = ({ uri, index, size, onRemove }: ImageTileProps) => {
    return (
        <View
            style={{ width: size, height: size }}
            className="rounded-xl overflow-hidden bg-gray-200"
        >
            <Image
                source={{ uri }}
                style={{ width: size, height: size }}
                resizeMode="cover"
            />

            {/* Remove button */}
            <TouchableOpacity
                onPress={onRemove}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full items-center justify-center"
            >
                <X size={12} color="white" />
            </TouchableOpacity>

            {/* Order badge */}
            <View className="absolute bottom-1.5 left-1.5 bg-black/50 rounded px-1.5 py-0.5">
                <Text className="text-white text-xs font-semibold">{index + 1}</Text>
            </View>
        </View>
    );
}