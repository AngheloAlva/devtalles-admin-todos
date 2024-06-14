"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarItem({ icon, path, title }: SidebarItemProps): React.ReactElement {
	const activePath = usePathname()

	return (
		<li>
			<Link
				href={path}
				className={`relative flex items-center space-x-4 rounded-xl px-4 py-3 text-gray-600 hover:text-gray-900 ${path === activePath && "bg-gradient-to-r from-sky-600 to-cyan-400 text-white hover:text-white"}`}
			>
				{icon}
				<span className="-mr-1 font-medium">{title}</span>
			</Link>
		</li>
	)
}

interface SidebarItemProps {
	icon: React.ReactElement
	title: string
	path: string
}
