import * as ImagePicker from "expo-image-picker";

export function useImageCapture(
    onAdd: (uris: string[]) => void
) {
    const pickFromGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Se necesita permiso para acceder a la galería.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            onAdd(result.assets.map((a) => a.uri));
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            alert("Se necesita permiso para acceder a la cámara.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ quality: 1 });

        if (!result.canceled && result.assets.length > 0) {
            onAdd([result.assets[0].uri]);
        }
    };

    return { pickFromGallery, takePhoto };
}