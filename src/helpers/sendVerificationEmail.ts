import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
    email: string,
    username: string,
    VerifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({ username, otp: VerifyCode }),
        });
        return { success: true, message: 'Email  send successfully' }

    } catch (emailError) {
        console.error("Error sending Verification Email", emailError)
        return { success: false, message: 'Failed to send Verification Email' }

    }
}

