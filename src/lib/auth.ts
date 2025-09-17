import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider
      }
      if (profile && 'email' in profile) {
        token.email = (profile as any).email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        ;(session as any).provider = (token as any).provider
      }
      return session
    },
  },
}
