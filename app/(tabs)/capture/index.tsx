import { useState, useEffect } from "react";
import { ScrollView, DeviceEventEmitter } from "react-native";

import {
    CaptureActions,
    CaptureHeader,
    CaptureTips,
    ImageGrid,
} from "@/src/components/capture";
import { useImageCapture } from "@/src/hooks/capture/useImageCapture";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CaptureScreen = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('quizGenerated', () => {
            setImages([]);
        });
        return () => subscription.remove();
    }, []);

    const addImages = (uris: string[]) =>
        setImages((prev) => [...prev, ...uris]);

    const removeImage = (index: number) =>
        setImages((prev) => prev.filter((_, i) => i !== index));

    const handleProcess = () => {
        // @ts-ignore
        router.push({
            pathname: "/quiz/processing",
            params: { images },
        });
    };

    const { takePhoto, pickFromGallery } = useImageCapture(addImages);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <CaptureHeader
                imageCount={images.length}
                onBack={() => router.back()}
            />

            <ScrollView
                className="flex-1 px-6 pt-6"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <ImageGrid images={images} onRemove={removeImage} />

                <CaptureActions
                    imageCount={images.length}
                    onTakePhoto={takePhoto}
                    onPickImages={pickFromGallery}
                    onProcess={handleProcess}
                />

                <CaptureTips />
            </ScrollView>
        </SafeAreaView>
    );
}

export default CaptureScreen;