import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'

type Product = {
  id: number
  name: string
  price: number
  category: string
}

export default function Home() {
  const products: Product[] = [
    {
      id: 1,
      name: 'RO 5110 TEWH',
      price: 2500000,
      category: 'Water Purifier',
    },
    {
      id: 2,
      name: 'Seamless Go',
      price: 1500000,
      category: 'Subscription',
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div data-testid="cart-count" className="hidden">
        1
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Welcome to Modena Store
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  )
}