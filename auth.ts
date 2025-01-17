import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { sendEmail } from "@/actions/mail";

export const auth = betterAuth({
  // #========= Database Adapter =========#
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // #========= Session =========#
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },

  // #========= Social Providers =========#
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // #========= Plugins =========#
  plugins: [openAPI(), admin({
    impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
  })],

  // #========= Email and Password =========#
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  
  // #========= Email Verification =========#
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  },

  // #========= Rate Limit =========#
  rateLimit: {
    window: 10, // time window in seconds
    max: 10, // max requests in the window
  },

  // #========= Account Linking =========
  account: {
    accountLinking: {
      enabled: true,
    }
  },

  // #========= Custom Config =========#
  
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;