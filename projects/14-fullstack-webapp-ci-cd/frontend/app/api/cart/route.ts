export async function POST() {
  return Response.json(
    {
      message: 'Item added to cart',
    },
    {
      status: 201,
    }
  )
}