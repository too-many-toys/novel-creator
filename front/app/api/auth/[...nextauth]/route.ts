import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId:
        process.env.KAKAO_CLIENT_ID || (console.error('not set KAKAO_CLIENT_ID'), process.exit(1)),
      clientSecret:
        process.env.KAKAO_CLIENT_SECRET ||
        (console.error('not set KAKAO_CLIENT_SECRET'), process.exit(1)),
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
