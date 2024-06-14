import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import credentials from "next-auth/providers/credentials"
import { signInEmailPassword } from "./auth/actions/auth-actions"

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			roles?: string[]
		} & DefaultSession["user"]
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		github,
		google,
		credentials({
			credentials: {
				username: { label: "Username" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const user = await signInEmailPassword(credentials!.email, credentials!.password)

				if (user) {
					return user
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			return true
		},
		async jwt({ token, user, account, profile }) {
			const dbUser = await prisma.user.findUnique({
				where: { email: token.email ?? "No-email" },
			})

			token.roles = dbUser?.roles ?? ["no-roles"]
			token.id = dbUser?.id ?? "no-uuid"

			return token
		},
		async session({ session, token, user }) {
			if (session && session.user) {
				;(session.user as any).roles = token.roles as any
				;(session.user as any).id = token.id
			}

			return session
		},
	},
})
