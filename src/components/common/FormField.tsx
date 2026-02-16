import { LucideIcon } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

interface FormFieldProps {
    label: string;
    icon: LucideIcon;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: "email-address" | "default";
}

export const FormField = ({
    label,
    icon: Icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
}: FormFieldProps) => {
    return (
        <View className="mb-4">
            <Text className="mb-2 text-base font-medium text-gray-700">{label}</Text>
            <View className="relative">
                <Icon size={20} color="#9ca3af" style={{ position: "absolute", left: 12, top: 12, zIndex: 1 }} />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    className="rounded-xl border border-gray-300 bg-white pl-12 pr-4 py-3 text-base text-gray-900 focus:border-purple-600"
                    editable
                />
            </View>
        </View>
    );
};
