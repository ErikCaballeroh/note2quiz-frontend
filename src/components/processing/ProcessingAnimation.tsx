import React from 'react';
import { View, Animated } from 'react-native';
import { Loader2, Sparkles } from 'lucide-react-native';

interface ProcessingAnimationProps {
    spin: Animated.AnimatedInterpolation<string | number>;
}

export const ProcessingAnimation = ({ spin }: ProcessingAnimationProps) => {
    return (
        <View className="items-center mb-8">
            <View className="relative">
                <View className="w-24 h-24 bg-purple-600 rounded-full items-center justify-center">
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Loader2 size={48} color="white" />
                    </Animated.View>
                </View>
                <View className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full items-center justify-center">
                    <Sparkles size={20} color="white" />
                </View>
            </View>
        </View>
    );
};
