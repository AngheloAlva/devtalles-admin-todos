import { ItemCard } from "@/shopping-cart/components"
import { cookies } from "next/headers"

import { products, type Product } from "@/products/data/products"
import { WidgetItem } from "@/components"

export const metadata = {
	title: "Cart page",
	description: "This is the cart page",
}

interface ProductInCart {
	product: Product
	quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }) => {
	const productsInCart: ProductInCart[] = []

	for (const id of Object.keys(cart)) {
		const product = products.find((product) => product.id === id)
		if (product) {
			productsInCart.push({ product, quantity: cart[id] })
		}
	}

	return productsInCart
}

export default function CartPage(): React.ReactElement {
	const cookiesStore = cookies()
	const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as { [id: string]: number }
	const productsInCart = getProductsInCart(cart)

	const totalToPay = productsInCart.reduce(
		(prev, current) => current.product.price * current.quantity + prev,
		0
	)

	return (
		<div>
			<h1 className="text-5xl">Products in cart</h1>
			<hr className="mb-2" />

			<div className="flex w-full flex-col gap-2 sm:flex-row">
				<div className="flex w-full flex-col gap-2 sm:w-8/12">
					{productsInCart.map(({ product, quantity }) => (
						<ItemCard key={product.id} product={product} quantity={quantity} />
					))}
				</div>

				<div className="flex w-full flex-col sm:w-4/12">
					<WidgetItem title="Total a pagar">
						<>
							<div className="mt-2 flex justify-center gap-4">
								<h3 className="text-3xl font-bold text-gray-700">
									$${(totalToPay * 1.19).toFixed(2)}
								</h3>
							</div>
							<span className="text-center font-bold text-gray-500">
								Inpuestos 19%: ${(totalToPay * 0.19).toFixed(2)}
							</span>
						</>
					</WidgetItem>
				</div>
			</div>
		</div>
	)
}
