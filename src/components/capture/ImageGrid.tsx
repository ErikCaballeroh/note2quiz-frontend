import { Image as ImageIcon } from "lucide-react-native";
import { Dimensions, Text, View } from "react-native";
import { ImageTile } from "./ImageTile";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GRID_PADDING = 48; // px-6 on both sides
const GRID_GAP = 8;
const NUM_COLUMNS = 3;

export const TILE_SIZE =
    (SCREEN_WIDTH - GRID_PADDING - GRID_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

interface ImageGridProps {
    images: string[];
    onRemove: (index: number) => void;
}

export const ImageGrid = ({ images, onRemove }: ImageGridProps) => {
    if (images.length === 0) {
        return (
            <View className="min-h-56 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl mb-6 items-center justify-center">
                <ImageIcon size={48} color="#9ca3af" />
                <Text className="text-gray-500 text-base font-medium mt-4">
                    Sin imágenes aún
                </Text>
                <Text className="text-gray-400 text-sm mt-1 text-center px-8">
                    Toma fotos o sube imágenes desde tu galería
                </Text>
            </View>
        );
    }

    return (
        <View className="mb-6">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Imágenes adjuntas · {images.length}
            </Text>

            <View className="flex-row flex-wrap" style={{ gap: GRID_GAP }}>
                {images.map((uri, index) => (
                    <ImageTile
                        key={`${uri}-${index}`}
                        uri={uri}
                        index={index}
                        size={TILE_SIZE}
                        onRemove={() => onRemove(index)}
                    />
                ))}
            </View>
        </View>
    );
}