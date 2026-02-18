import React from "react";
import { Text, View } from "react-native";
import { StatsCardProps } from "./types";

const StatsCard: React.FC<StatsCardProps> = ({
    icon: Icon,
    value,
    label,
    color = "#9333ea",
}) => {
    return (
        <View className="flex-1 bg-gray-50 rounded-xl p-3 items-center border border-gray-200">
            <Icon color={color} size={24} />
            <Text className="text-2xl font-bold text-gray-900 mt-1">{value}</Text>
            <Text className="text-xs text-gray-600">{label}</Text>
        </View>
    );
};

export default StatsCard;
