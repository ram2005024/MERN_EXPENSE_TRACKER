export const otpHTML = (token) => {
  return `<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    
    <div style="background-color: #4285f4; padding: 30px 20px; text-align: center;">
        <div style="font-size: 32px; font-weight: bold; color: #ffffff; letter-spacing: -1px;">Gmail</div>
    </div>
    
    <div style="padding: 40px 30px;">
        <div style="font-size: 18px; color: #202124; margin-bottom: 20px;">Hello,</div>
        
        <div style="font-size: 14px; color: #5f6368; line-height: 1.6; margin-bottom: 30px;">
            We received a request to reset your password. Use the verification code below to complete your password reset:
        </div>
        
        <div style="background-color: #f8f9fa; border: 2px dashed #dadce0; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
            <div style="font-size: 12px; color: #5f6368; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Verification Code</div>
            <div style="font-size: 36px; font-weight: bold; color: #4285f4; letter-spacing: 8px; font-family: 'Courier New', monospace;">${token}</div>
            <div style="font-size: 12px; color: #d93025; margin-top: 10px;">Valid for 2 minutes</div>
        </div>
        
        <div style="background-color: #fef7e0; border-left: 4px solid #f9ab00; padding: 15px; margin: 20px 0; font-size: 13px; color: #5f6368;">
            <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact support if you have concerns about your account security.
        </div>
        
        <div style="height: 1px; background-color: #dadce0; margin: 20px 0;"></div>
        
        <div style="font-size: 14px; color: #5f6368; line-height: 1.6; margin-bottom: 30px;">
            This code will expire in 2 minutes for security reasons. If you need a new code, please return to the password reset page and request again.
        </div>
    </div>
    
    <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #5f6368; line-height: 1.6;">
        <p style="margin: 0;">This email was sent to you because a password reset was requested for your account.</p>
        <p style="margin: 10px 0 0 0;">
            Need help? Visit our <a href="#" style="color: #4285f4; text-decoration: none;">Help Center</a>
        </p>
        <p style="margin: 15px 0 0 0; color: #80868b;">
            © 2024 Gmail. All rights reserved.
        </p>
    </div>
    
</div>`;
};
