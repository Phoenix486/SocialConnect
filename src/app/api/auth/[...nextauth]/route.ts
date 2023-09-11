import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import Auth0Provider from "next-auth/providers/auth0"
import {BASE_URL} from "@/constants";

export const authOptions : NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "string@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                })

                const user = await res.json()

                if (res.ok && user) {
                    return user
                }

                return null
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_ID as string,
            clientSecret: process.env.AUTH0_SECRET as string,
            issuer: process.env.AUTH0_ISSUER,
          }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }