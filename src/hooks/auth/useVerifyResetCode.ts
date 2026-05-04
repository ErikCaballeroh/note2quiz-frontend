import { useMutation } from "@tanstack/react-query";

import { verifyResetCode } from "@/src/services/auth.service";
import { VerifyResetCodeRequestDto } from "@/src/types/dto/auth/reset-password.dto";

export const useVerifyResetCode = () => {
    return useMutation({
        mutationFn: (data: VerifyResetCodeRequestDto) => verifyResetCode(data),
    });
};