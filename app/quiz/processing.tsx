import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ProcessingAnimation, ProcessingSteps, ProcessingProgressBar } from "@/src/components/processing";
import { useQuizProcessing } from "@/src/hooks/quiz/useQuizProcessing";

export default function ProcessingScreen() {
  const params = useLocalSearchParams();
  
  // Clean up images array from params
  const images = params.images 
    ? (Array.isArray(params.images) ? params.images : params.images.split(',')) 
    : [];

  const { currentStep, progress, quiz, error } = useQuizProcessing(images);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spin animation (loop)
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  useEffect(() => {
    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  useEffect(() => {
    // Navigate after completion
    if (currentStep === 'completed' && quiz) {
      const timer = setTimeout(() => {
        router.push({
          pathname: "/quiz/[id]/preview",
          params: { id: quiz.id }
        });
      }, 1500); // 1.5s delay to show completed state
      return () => clearTimeout(timer);
    }
  }, [currentStep, quiz]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="flex-1 bg-gray-50 items-center justify-center p-6">
      <View className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8">

        <ProcessingAnimation spin={spin} />

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          {currentStep === 'completed' ? '¡Generado con éxito!' : currentStep === 'error' ? 'Error' : 'Generando Cuestionario'}
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          {currentStep === 'completed' ? 'Redirigiendo...' : currentStep === 'error' ? 'No se pudo generar el cuestionario' : 'Estamos procesando tus apuntes con IA'}
        </Text>

        <ProcessingSteps currentStep={currentStep} spin={spin} />

        <ProcessingProgressBar progressWidth={progressWidth} hasError={error !== null} />
        
        {error && (
            <Text className="text-red-500 text-center text-sm font-semibold mt-4">
                {error}
            </Text>
        )}

      </View>
    </View>
  );
}