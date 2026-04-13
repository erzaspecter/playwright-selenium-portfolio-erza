import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 0 },
    { duration: '5s', target: 500 },
    { duration: '10s', target: 500 },
    { duration: '10s', target: 0 },
  ],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const res = http.get(${BASE_URL}/posts/1);
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}
