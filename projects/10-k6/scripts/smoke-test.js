import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts/1');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has id': (r) => r.json().id === 1,
  });
  sleep(1);
}
