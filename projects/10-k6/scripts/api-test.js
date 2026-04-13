import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '1m',
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  group('User APIs', () => {
    const usersRes = http.get(${BASE_URL}/users);
    check(usersRes, {
      'GET /users - status 200': (r) => r.status === 200,
      'GET /users - has data': (r) => r.json().length > 0,
    });
    sleep(1);
  });
}
