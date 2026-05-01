import { Animated, View } from "react-native";

interface GameProgressBarProps {
    progress: Animated.Value;
}

export const GameProgressBar = ({ progress }: GameProgressBarProps) => {
    return (
        <View className="px-6 py-4">
            <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <Animated.View
                    className="h-full bg-purple-600 rounded-full"
                    style={{
                        width: progress.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["0%", "100%"],
                        }),
                    }}
                />
            </View>
        </View>
    );
};
