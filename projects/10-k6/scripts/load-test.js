import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const res1 = http.get(${BASE_URL}/posts);
  check(res1, { 'GET posts': (r) => r.status === 200 });
  sleep(1);
  
  const res2 = http.get(${BASE_URL}/posts/1);
  check(res2, { 'GET post by id': (r) => r.status === 200 });
  sleep(1);
  
  const payload = JSON.stringify({
    title: 'k6 Load Test',
    body: 'Testing performance with k6',
    userId: 1,
  });
  
  const res3 = http.post(${BASE_URL}/posts, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(res3, { 'POST created': (r) => r.status === 201 });
  sleep(1);
}
