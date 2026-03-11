import { note2quizApi } from "../api/api";

export interface OcrResponse {
    pages: number;
    text: string;
}

export const uploadImagesForOcr = async (imageUris: string[]): Promise<OcrResponse> => {
    const formData = new FormData();

    imageUris.forEach((uri, index) => {
        const filename = uri.split('/').pop() || `image_${index}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append('images', {
            uri,
            name: filename,
            type,
        } as any);
    });

    // Use a specific config for multipart/form-data
    return await note2quizApi.post('/ocr', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
