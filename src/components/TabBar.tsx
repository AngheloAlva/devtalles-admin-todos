"use client"

import { setCookie } from "cookies-next"
import { useState } from "react"

export default function TabBar({
	currentTab = 1,
	tabOptions = [1, 2, 3, 4],
}: TabBarProps): React.ReactElement {
	const [selected, setSelected] = useState(currentTab)

	const onTabSelected = (tab: number) => {
		setSelected(tab)
		setCookie("selectedTab", tab.toString())
	}

	return (
		<div
			className={`grid w-full ${"grid-cols-" + tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}
		>
			{tabOptions.map((tab) => (
				<div key={tab}>
					<input
						id="1"
						type="radio"
						onChange={() => {}}
						className="peer hidden"
						checked={selected === tab}
					/>
					<label
						onClick={() => onTabSelected(tab)}
						className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
					>
						{tab}
					</label>
				</div>
			))}
		</div>
	)
}

interface TabBarProps {
	currentTab?: number
	tabOptions?: number[]
}
