export async function GET() {
  return Response.json([
    { id: 1, name: 'RO 5110 TEWH', price: 2500000, category: 'Water Purifier' },
    { id: 2, name: 'Seamless Go', price: 1500000, category: 'Subscription' },
  ])
}

export async function POST() {
  return Response.json(
    { message: 'Item added to cart' },
    { status: 201 }
  )
}