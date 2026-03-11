import React from 'react';
import { View, Text, Animated } from 'react-native';
import { CheckCircle2, FileText, Loader2, XCircle } from 'lucide-react-native';
import { ProcessingStep } from '../../hooks/quiz/useQuizProcessing';

interface ProcessingStepsProps {
    currentStep: ProcessingStep;
    spin: Animated.AnimatedInterpolation<string | number>;
}

export const ProcessingSteps = ({ currentStep, spin }: ProcessingStepsProps) => {
    
    // Helper to determine status based on step progression
    const getStatus = (stepName: ProcessingStep, order: number) => {
        const stepOrder = { 'extracting': 1, 'generating': 2, 'completed': 3, 'error': -1 };
        const currentOrder = stepOrder[currentStep];
        
        if (currentStep === 'error') return 'error';
        if (currentOrder > order) return 'done';
        if (currentOrder === order) return 'current';
        return 'pending';
    };

    const StatusIcon = ({ status }: { status: string }) => {
        if (status === 'done') {
            return (
                <View className="w-8 h-8 bg-purple-600 rounded-full items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={20} color="white" />
                </View>
            );
        }
        if (status === 'error') {
            return (
                <View className="w-8 h-8 bg-red-600 rounded-full items-center justify-center shrink-0 mt-0.5">
                    <XCircle size={20} color="white" />
                </View>
            );
        }
        if (status === 'current') {
            return (
                <View className="w-8 h-8 bg-purple-600 rounded-full items-center justify-center shrink-0 mt-0.5">
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Loader2 size={20} color="white" />
                    </Animated.View>
                </View>
            );
        }
        return (
            <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center shrink-0 mt-0.5">
                <FileText size={20} color="#9ca3af" />
            </View>
        );
    };

    const StatusTitle = ({ title, status }: { title: string, status: string }) => {
        const style = status === 'pending' ? 'text-gray-400' : status === 'error' ? 'text-red-600' : 'text-gray-900';
        return <Text className={`font-semibold ${style}`}>{title}</Text>;
    };

    const StatusDesc = ({ desc, status }: { desc: string, status: string }) => {
        const style = status === 'pending' ? 'text-gray-400' : status === 'error' ? 'text-red-500' : 'text-gray-600';
        return <Text className={`text-sm ${style}`}>{desc}</Text>;
    };

    return (
        <View className="gap-4">
            {/* Step 1: Extracting */}
            <View className="flex-row items-start gap-3">
                <StatusIcon status={getStatus('extracting', 1)} />
                <View className="flex-1">
                    <StatusTitle title="Extrayendo texto" status={getStatus('extracting', 1)} />
                    <StatusDesc 
                        desc={getStatus('extracting', 1) === 'done' ? 'OCR completado' : 'Analizando imagen...'} 
                        status={getStatus('extracting', 1)} 
                    />
                </View>
            </View>

            {/* Step 2: Generating */}
            <View className="flex-row items-start gap-3">
                <StatusIcon status={getStatus('generating', 2)} />
                <View className="flex-1">
                    <StatusTitle title="Generando preguntas" status={getStatus('generating', 2)} />
                    <StatusDesc 
                        desc={getStatus('generating', 2) === 'done' ? 'Generación completada' : getStatus('generating', 2) === 'current' ? 'Procesando con IA...' : 'En espera...'} 
                        status={getStatus('generating', 2)} 
                    />
                </View>
            </View>
        </View>
    );
};
