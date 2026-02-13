import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
    console.log(useSegments());

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'indigo',
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name='book-outline' color={color} />
                }}
            />
            <Tabs.Screen
                name="capture/index"
                options={{
                    title: 'Capturar',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name='camera-outline' color={color} />
                }}
            />
            <Tabs.Screen
                name="saved/index"
                options={{
                    title: 'Guardados',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name='time-outline' color={color} />
                }}
            />
        </Tabs>
    )
}

export default TabsLayout