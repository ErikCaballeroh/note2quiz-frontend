import type { LayoutChangeEvent } from "react-native";

export interface EditQuestion {
    id: number;
    question: string;
    options: string[];
    correct: number;
}

export interface EditQuizHeaderProps {
    onBack: () => void;
}

export interface EditQuizTitleInputProps {
    value: string;
    onChange: (value: string) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export interface EditQuestionCardProps {
    question: EditQuestion;
    index: number;
    total: number;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDelete: () => void;
    onQuestionChange: (value: string) => void;
    onOptionChange: (optionIndex: number, value: string) => void;
    onCorrectChange: (optionIndex: number) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export interface AddQuestionButtonProps {
    onPress: () => void;
}

export interface EditQuizSaveBarProps {
    onSave: () => void;
}
