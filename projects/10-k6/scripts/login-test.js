import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
};

const BASE_URL = 'https://dummyjson.com';

export default function () {
  const loginPayload = JSON.stringify({
    username: 'kminchelle',
    password: '0lelplR',
  });
  
  const loginRes = http.post(${BASE_URL}/auth/login, loginPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(loginRes, {
    'Login successful': (r) => r.status === 200,
    'Has access token': (r) => r.json().accessToken !== undefined,
  });
  
  sleep(1);
}
