import { Image as ImageIcon } from "lucide-react-native";
import { Text, View } from "react-native";

const TIPS = [
    "Asegúrate de tener buena iluminación",
    "Mantén el texto enfocado y legible",
    "Evita sombras sobre los apuntes",
    "Captura el texto completo en cada imagen",
];

export const CaptureTips = () => {
    return (
        <View className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <View className="flex-row items-center mb-2">
                <ImageIcon size={18} color="#1e40af" />
                <Text className="font-semibold text-blue-900 ml-2">
                    Consejos para mejores resultados
                </Text>
            </View>

            {TIPS.map((tip, i) => (
                <Text key={i} className="text-sm text-blue-800 mt-1">
                    • {tip}
                </Text>
            ))}
        </View>
    );
}