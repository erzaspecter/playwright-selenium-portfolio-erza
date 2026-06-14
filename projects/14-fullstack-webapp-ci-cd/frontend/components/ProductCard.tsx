import Link from 'next/link'

type Product = {
  id: number
  name: string
  price: number
  category: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <Link href={`/products/${product.id}`}>
        <h2 className="text-xl font-semibold mb-2 cursor-pointer">
          {product.name}
        </h2>
      </Link>

      <p className="text-gray-600 mb-2">{product.category}</p>

      <p className="text-green-600 font-bold text-lg mb-4">
        Rp {product.price.toLocaleString('id-ID')}
      </p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  )
}