import { LogOut } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { HomeHeaderProps } from "./types";

const HomeHeader: React.FC<HomeHeaderProps> = ({
    userName,
    onLogoutPress,
}) => {
    return (
        <View className="bg-white border-b border-gray-200 p-6">
            <View className="flex-row items-center justify-between mb-6">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">Hola, {userName}</Text>
                    <Text className="text-gray-600 text-sm mt-0.5">¿Listo para aprender?</Text>
                </View>

                {/* Logout Icon */}
                <TouchableOpacity
                    onPress={onLogoutPress}
                    className="w-10 h-10 items-center justify-center"
                    activeOpacity={0.7}
                >
                    <LogOut color="#dc2626" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;
