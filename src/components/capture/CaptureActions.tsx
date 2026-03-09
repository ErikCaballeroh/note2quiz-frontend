import { Camera, Upload } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface CaptureActionsProps {
    imageCount: number;
    onTakePhoto: () => void;
    onPickImages: () => void;
    onProcess: () => void;
}

export const CaptureActions = ({
    imageCount,
    onTakePhoto,
    onPickImages,
    onProcess,
}: CaptureActionsProps) => {
    const hasImages = imageCount > 0;

    return (
        <View style={{ gap: 12 }}>
            {/* Camera */}
            <TouchableOpacity
                onPress={onTakePhoto}
                className="w-full bg-purple-600 py-4 rounded-xl flex-row items-center justify-center active:bg-purple-700"
            >
                <Camera size={22} color="white" />
                <Text className="text-white font-semibold text-base ml-3">
                    {hasImages ? "Tomar Otra Foto" : "Tomar Foto"}
                </Text>
            </TouchableOpacity>

            {/* Gallery */}
            <TouchableOpacity
                onPress={onPickImages}
                className="w-full bg-white py-4 rounded-xl border border-gray-300 flex-row items-center justify-center active:border-purple-600"
            >
                <Upload size={22} color="#374151" />
                <Text className="text-gray-700 font-semibold text-base ml-3">
                    {hasImages ? "Agregar desde Galería" : "Subir desde Galería"}
                </Text>
            </TouchableOpacity>

            {/* Process — only visible when there are images */}
            {hasImages && (
                <TouchableOpacity
                    onPress={onProcess}
                    className="w-full bg-gray-900 py-4 rounded-xl items-center active:bg-gray-800"
                    style={{ marginTop: 4 }}
                >
                    <Text className="text-white font-semibold text-base">
                        Generar Cuestionario{" "}
                        <Text className="text-white/50">
                            ({imageCount} {imageCount === 1 ? "imagen" : "imágenes"})
                        </Text>
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}