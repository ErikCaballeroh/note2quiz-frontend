export interface QuizData {
    id: number;
    title: string;
    questions: number;
    date: string;
    score?: number;
}

export interface StatsCardProps {
    icon: React.ComponentType<any>;
    value: string | number;
    label: string;
    color?: string;
}

export interface QuizCardProps {
    quiz: QuizData;
    onPress: () => void;
}

export interface CreateQuizButtonProps {
    onPress: () => void;
}

export interface RecentQuizzesProps {
    quizzes: QuizData[];
    onQuizPress: (id: number) => void;
    onViewAllPress: () => void;
}

export interface HomeHeaderProps {
    userName: string;
    onProfilePress: () => void;
    onSettingsPress: () => void;
    onLogoutPress: () => void;
}

export interface StatsCardsProps {
    quizCount: number;
    averageScore: number;
    hoursStudied: number;
}
