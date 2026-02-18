import { LogOut, Settings, User } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { HomeHeaderProps } from "./types";

const HomeHeader: React.FC<HomeHeaderProps> = ({
    userName,
    onProfilePress,
    onSettingsPress,
    onLogoutPress,
}) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuPress = (action: () => void) => {
        setShowMenu(false);
        action();
    };

    return (
        <View className="bg-white border-b border-gray-200 p-6">
            <View className="flex-row items-center justify-between mb-6">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">Hola, {userName}</Text>
                    <Text className="text-gray-600 text-sm mt-0.5">¿Listo para aprender?</Text>
                </View>

                {/* Avatar + Dropdown Menu */}
                <View className="relative z-10">
                    <TouchableOpacity
                        onPress={() => setShowMenu(!showMenu)}
                        className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <User color="#ffffff" size={20} />
                    </TouchableOpacity>

                    {showMenu && (
                        <View className="absolute right-0 top-12 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50">
                            <TouchableOpacity
                                className="flex-row items-center gap-3 px-4 py-2.5"
                                onPress={() => handleMenuPress(onProfilePress)}
                            >
                                <User color="#374151" size={16} />
                                <Text className="text-gray-700 text-sm">Mi Perfil</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-row items-center gap-3 px-4 py-2.5"
                                onPress={() => handleMenuPress(onSettingsPress)}
                            >
                                <Settings color="#374151" size={16} />
                                <Text className="text-gray-700 text-sm">Configuración</Text>
                            </TouchableOpacity>

                            <View className="my-1 border-t border-gray-200" />

                            <TouchableOpacity
                                className="flex-row items-center gap-3 px-4 py-2.5"
                                onPress={() => handleMenuPress(onLogoutPress)}
                            >
                                <LogOut color="#dc2626" size={16} />
                                <Text className="text-red-600 text-sm">Cerrar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default HomeHeader;
