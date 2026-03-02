import { BookOpen, Clock, Trophy } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import StatsCard from "./StatsCard";
import { StatsCardsProps } from "./types";

const StatsCards: React.FC<StatsCardsProps> = ({
    quizCount,
    averageScore,
    hoursStudied,
}) => {
    return (
        <View className="flex-row gap-3">
            <StatsCard
                icon={BookOpen}
                value={quizCount}
                label="Cuestionarios"
                color="#9333ea"
            />
            <StatsCard
                icon={Trophy}
                value={`${averageScore}`}
                label="Promedio"
                color="#9333ea"
            />
            <StatsCard
                icon={Clock}
                value={`${hoursStudied}h`}
                label="Estudiadas"
                color="#9333ea"
            />
        </View>
    );
};

export default StatsCards;
