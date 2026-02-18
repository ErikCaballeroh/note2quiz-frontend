import { Tabs } from 'expo-router';
import { BookOpen, Camera, History, LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabIconProps {
    focused: boolean;
    Icon: LucideIcon;
    title: string;
}

const TabsLayout = () => {
    const insets = useSafeAreaInsets();

    const TabIcon = ({ focused, Icon, title }: TabIconProps) => (
        <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <View
                style={{
                    padding: 12,
                    borderRadius: 16,
                    backgroundColor: focused ? '#9333ea' : 'transparent',
                }}
            >
                <Icon
                    color={focused ? '#fff' : '#9ca3af'}
                    size={20}
                />
            </View>

            <Text
                numberOfLines={1}
                style={{
                    fontSize: 12,
                    color: focused ? '#9333ea' : '#9ca3af',
                    fontWeight: focused ? '600' : '400',
                }}
            >
                {title}
            </Text>
        </View>
    );

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 0,
                    backgroundColor: 'white',
                },
                tabBarItemStyle: {
                    flex: 1,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIconStyle: {
                    flex: 1,
                    width: '100%',
                    height: '100%',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused} Icon={BookOpen} title="Inicio" />
                }}
            />
            <Tabs.Screen
                name="capture/index"
                options={{
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused} Icon={Camera} title="Capturar" />
                }}
            />
            <Tabs.Screen
                name="saved/index"
                options={{
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused} Icon={History} title="Guardados" />
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;