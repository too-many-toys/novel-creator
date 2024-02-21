import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession['user'];
  }
  interface Token {
    accessToken: string;
  }
}
