import { ProductCard } from "@/products/components"
import { products } from "@/products/data/products"

export default function ProductsPage(): React.ReactElement {
	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
			{products.map((product) => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	)
}
