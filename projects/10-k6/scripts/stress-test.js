import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 300 },
    { duration: '1m', target: 300 },
    { duration: '30s', target: 0 },
  ],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const res = http.get(${BASE_URL}/posts/1);
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}
