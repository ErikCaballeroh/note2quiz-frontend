import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadImagesForOcr } from '../../services/ocr.service';
import { generateQuiz } from '../../services/quizzes.service';
import { QuizDto } from '../../types/dto/quizzes/quiz.dto';

export type ProcessingStep = 'extracting' | 'generating' | 'completed' | 'error';

interface UseQuizProcessingResult {
    currentStep: ProcessingStep;
    progress: number;
    quiz: QuizDto | null;
    error: string | null;
}

export const useQuizProcessing = (images: string[]): UseQuizProcessingResult => {
    const [currentStep, setCurrentStep] = useState<ProcessingStep>('extracting');
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationFn: async (imageUris: string[]) => {
            if (!imageUris || imageUris.length === 0) {
                throw new Error('No images provided');
            }

            setCurrentStep('extracting');
            setProgress(0.2);

            const ocrResult = await uploadImagesForOcr(imageUris);
            
            setProgress(0.5);

            if (!ocrResult.text) {
                throw new Error("No text extracted from images");
            }

            setCurrentStep('generating');
            setProgress(0.6);

            const generatedQuiz = await generateQuiz(ocrResult.text);
            
            return generatedQuiz;
        },
        onSuccess: () => {
            setProgress(1.0);
            setCurrentStep('completed');
        },
        onError: () => {
            setCurrentStep('error');
            setProgress(0);
        }
    });

    useEffect(() => {
        // Start processing automatically when the hook mounts and images are available
        if (images && images.length > 0 && !mutation.isPending && currentStep === 'extracting' && progress === 0) {
            mutation.mutate(images);
        }
    }, [images]);

    return {
        currentStep: mutation.isError ? 'error' : currentStep,
        progress,
        quiz: mutation.data || null,
        error: mutation.error?.message || null,
    };
};
