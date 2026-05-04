import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/src/services/auth.service";
import { ResetPasswordRequestDto } from "@/src/types/dto/auth/reset-password.dto";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: ResetPasswordRequestDto) => resetPassword(data),
    });
};