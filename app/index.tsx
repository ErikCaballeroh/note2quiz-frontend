import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            setHasToken(!!token);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#7C3AED" />
            </View>
        );
    }

    return <Redirect href={hasToken ? '/(tabs)' : '/(auth)/login'} />;
};

export default App;