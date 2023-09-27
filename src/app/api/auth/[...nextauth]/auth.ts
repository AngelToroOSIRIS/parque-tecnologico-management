import { AuthOptions, SessionStrategy } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: AuthOptions = {
  providers: [
    AzureADProvider({
      //@ts-ignore
      clientId: process.env.AZURE_AD_CLIENT_ID,

      //@ts-ignore
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,

      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],

  session: {
    strategy: "jwt" as SessionStrategy,

    maxAge: 1 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login/error", // Error code passed in query string as ?error=
  },
};
