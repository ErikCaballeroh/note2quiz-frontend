import { Text, View } from "react-native";

interface QuestionCardProps {
    question: string;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
    return (
        <View className="px-6 pb-2">
            <View className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <Text className="text-2xl font-bold text-gray-900 text-center">
                    {question}
                </Text>
            </View>
        </View>
    );
};
