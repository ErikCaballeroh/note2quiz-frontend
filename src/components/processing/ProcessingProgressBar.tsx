import React from 'react';
import { View, Text, Animated } from 'react-native';

interface ProcessingProgressBarProps {
    progressWidth: Animated.AnimatedInterpolation<string | number>;
    hasError: boolean;
}

export const ProcessingProgressBar = ({ progressWidth, hasError }: ProcessingProgressBarProps) => {
    return (
        <View className="mt-8">
            <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <Animated.View
                    className={`h-full rounded-full ${hasError ? 'bg-red-600' : 'bg-purple-600'}`}
                    style={{ width: progressWidth }}
                />
            </View>
            <Text className={`text-center text-sm mt-2 ${hasError ? 'text-red-500' : 'text-gray-600'}`}>
                {hasError ? 'Hubo un error en el procesamiento.' : 'Esto puede tomar unos segundos...'}
            </Text>
        </View>
    );
};
