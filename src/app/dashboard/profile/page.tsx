"use client"

import { useSession } from "next-auth/react"

export default function ProfilePage(): React.ReactElement {
	const session = useSession()

	return (
		<div>
			<h1>Profile Page</h1>

			<div className="flex flex-col">
				<span>{session?.data?.user?.name}</span>
				<span>{session?.data?.user?.email}</span>
				<span>{session?.data?.user?.image}</span>
			</div>
		</div>
	)
}
