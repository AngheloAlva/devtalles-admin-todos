"use client"

import { SessionProvider } from "next-auth/react"

export default function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
	return <SessionProvider>{children}</SessionProvider>
}

interface AuthProviderProps {
	children: React.ReactElement
}
