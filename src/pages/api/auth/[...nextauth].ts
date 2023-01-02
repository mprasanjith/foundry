import NextAuth, {
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email gist",
        },
      },
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async jwt(params) {
      const { token, account } = params;
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
