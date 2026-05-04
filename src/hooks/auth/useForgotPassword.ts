import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "@/src/services/auth.service";
import { ForgotPasswordRequestDto } from "@/src/types/dto/auth/reset-password.dto";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (data: ForgotPasswordRequestDto) => forgotPassword(data),
    });
};