import { randomBytes } from "crypto";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return Response.json({ error: "Email required" }, { status: 400 });

  // Always respond with success to avoid leaking whether an account exists
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return Response.json({ ok: true });

  // Delete any existing tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  // Create new token (expires in 1 hour)
  const token = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Nora <onboarding@resend.dev>",
    to: user.email,
    subject: "Reset your Nora password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 32px;">🍐</span>
          <h1 style="font-size: 22px; font-weight: 700; color: #16a34a; margin: 8px 0 0;">Nora</h1>
        </div>
        <h2 style="font-size: 18px; font-weight: 600; color: #1c1917; margin-bottom: 8px;">Reset your password</h2>
        <p style="color: #78716c; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
          Hi ${user.name}, click the button below to set a new password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}"
           style="display: inline-block; background: #16a34a; color: white; text-decoration: none;
                  padding: 12px 28px; border-radius: 999px; font-size: 14px; font-weight: 600;">
          Reset password
        </a>
        <p style="color: #a8a29e; font-size: 12px; margin-top: 24px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  return Response.json({ ok: true });
}
