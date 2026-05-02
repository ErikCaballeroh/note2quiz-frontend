import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />

                    <Stack.Screen
                        name="quiz"
                        options={{
                            presentation: "card",
                        }}
                    />
                </Stack>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}