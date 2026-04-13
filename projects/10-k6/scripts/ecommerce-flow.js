import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '1m', target: 0 },
  ],
};

const BASE_URL = 'https://dummyjson.com';

export default function () {
  const productsRes = http.get(${BASE_URL}/products?limit=10);
  check(productsRes, { 'Browse products': (r) => r.status === 200 });
  sleep(1);
  
  const cartPayload = JSON.stringify({
    userId: 1,
    products: [{ id: 1, quantity: 1 }],
  });
  
  const cartRes = http.post(${BASE_URL}/carts/add, cartPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(cartRes, { 'Add to cart': (r) => r.status === 200 });
  sleep(1);
}
