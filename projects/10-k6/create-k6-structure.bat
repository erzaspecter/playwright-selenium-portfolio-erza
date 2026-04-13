@echo off
echo Creating k6 project structure...

REM Create folders
mkdir scripts utils reports results docs 2>nul

REM Create empty placeholder files
type nul > reports\.gitkeep 2>nul
type nul > results\.gitkeep 2>nul

REM Create README.md
(
echo # k6 Performance Testing Portfolio
echo.
echo ## 📋 Overview
echo Collection of performance/load testing scripts using **k6**.
echo.
echo ## 🚀 How to Run
echo ```bash
echo k6 run scripts/smoke-test.js
echo ```
) > README.md

REM Create .env.example
(
echo BASE_URL=https://jsonplaceholder.typicode.com
echo API_KEY=your-api-key-here
) > .env.example

REM Create utils/helpers.js
(
echo // Helper functions for k6
echo export function randomInt(min, max) {
echo   return Math.floor(Math.random() * (max - min + 1)) + min;
echo }
echo.
echo export function randomString(length) {
echo   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
echo   let result = '';
echo   for (let i = 0; i ^< length; i++) {
echo     result += chars.charAt(Math.floor(Math.random() * chars.length));
echo   }
echo   return result;
echo }
) > utils\helpers.js

REM Create utils/config.js
(
echo // Global configuration
echo export const BASE_URL = __ENV.BASE_URL || 'https://jsonplaceholder.typicode.com';
echo export const TIMEOUT = __ENV.TIMEOUT || 30000;
echo export const THRESHOLDS = {
echo   http_req_duration: ['p(95)^<500'],
echo   http_req_failed: ['rate^<0.01'],
echo };
) > utils\config.js

REM Create scripts/smoke-test.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   vus: 1,
echo   duration: '10s',
echo   thresholds: {
echo     http_req_failed: ['rate^<0.01'],
echo     http_req_duration: ['p(95)^<1000'],
echo   },
echo };
echo.
echo export default function () {
echo   const res = http.get('https://jsonplaceholder.typicode.com/posts/1');
echo   check(res, {
echo     'status is 200': (r) => r.status === 200,
echo     'response has id': (r) => r.json().id === 1,
echo   });
echo   sleep(1);
echo }
) > scripts\smoke-test.js

REM Create scripts/load-test.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   stages: [
echo     { duration: '30s', target: 20 },
echo     { duration: '1m', target: 20 },
echo     { duration: '30s', target: 0 },
echo   ],
echo   thresholds: {
echo     http_req_duration: ['p(95)^<500'],
echo     http_req_failed: ['rate^<0.01'],
echo   },
echo };
echo.
echo const BASE_URL = 'https://jsonplaceholder.typicode.com';
echo.
echo export default function () {
echo   const res1 = http.get(`${BASE_URL}/posts`);
echo   check(res1, { 'GET posts': (r) => r.status === 200 });
echo   sleep(1);
echo   const res2 = http.get(`${BASE_URL}/posts/1`);
echo   check(res2, { 'GET post by id': (r) => r.status === 200 });
echo   sleep(1);
echo   const payload = JSON.stringify({
echo     title: 'k6 Load Test',
echo     body: 'Testing performance with k6',
echo     userId: 1,
echo   });
echo   const res3 = http.post(`${BASE_URL}/posts`, payload, {
echo     headers: { 'Content-Type': 'application/json' },
echo   });
echo   check(res3, { 'POST created': (r) => r.status === 201 });
echo   sleep(1);
echo }
) > scripts\load-test.js

REM Create scripts/api-test.js
(
echo import http from 'k6/http';
echo import { check, group, sleep } from 'k6';
echo.
echo export const options = {
echo   vus: 10,
echo   duration: '1m',
echo };
echo.
echo const BASE_URL = 'https://jsonplaceholder.typicode.com';
echo.
echo export default function () {
echo   group('User APIs', () => {
echo     const usersRes = http.get(`${BASE_URL}/users`);
echo     check(usersRes, {
echo       'GET /users - status 200': (r) => r.status === 200,
echo       'GET /users - has data': (r) => r.json().length > 0,
echo     });
echo     sleep(1);
echo   });
echo }
) > scripts\api-test.js

REM Create scripts/login-test.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   stages: [
echo     { duration: '30s', target: 10 },
echo     { duration: '1m', target: 10 },
echo     { duration: '30s', target: 0 },
echo   ],
echo };
echo.
echo const BASE_URL = 'https://dummyjson.com';
echo.
echo export default function () {
echo   const loginPayload = JSON.stringify({
echo     username: 'kminchelle',
echo     password: '0lelplR',
echo   });
echo   const loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, {
echo     headers: { 'Content-Type': 'application/json' },
echo   });
echo   check(loginRes, {
echo     'Login successful': (r) => r.status === 200,
echo     'Has access token': (r) => r.json().accessToken !== undefined,
echo   });
echo   sleep(1);
echo }
) > scripts\login-test.js

REM Create scripts/stress-test.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   stages: [
echo     { duration: '30s', target: 50 },
echo     { duration: '30s', target: 100 },
echo     { duration: '30s', target: 200 },
echo     { duration: '30s', target: 300 },
echo     { duration: '1m', target: 300 },
echo     { duration: '30s', target: 0 },
echo   ],
echo };
echo.
echo const BASE_URL = 'https://jsonplaceholder.typicode.com';
echo.
echo export default function () {
echo   const res = http.get(`${BASE_URL}/posts/1`);
echo   check(res, { 'status is 200': (r) => r.status === 200 });
echo   sleep(0.5);
echo }
) > scripts\stress-test.js

REM Create scripts/ecommerce-flow.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   stages: [
echo     { duration: '1m', target: 50 },
echo     { duration: '2m', target: 50 },
echo     { duration: '1m', target: 0 },
echo   ],
echo };
echo.
echo const BASE_URL = 'https://dummyjson.com';
echo.
echo export default function () {
echo   const productsRes = http.get(`${BASE_URL}/products?limit=10`);
echo   check(productsRes, { 'Browse products': (r) => r.status === 200 });
echo   sleep(1);
echo   const cartPayload = JSON.stringify({
echo     userId: 1,
echo     products: [{ id: 1, quantity: 1 }],
echo   });
echo   const cartRes = http.post(`${BASE_URL}/carts/add`, cartPayload, {
echo     headers: { 'Content-Type': 'application/json' },
echo   });
echo   check(cartRes, { 'Add to cart': (r) => r.status === 200 });
echo   sleep(1);
echo }
) > scripts\ecommerce-flow.js

REM Create scripts/spike-test.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   stages: [
echo     { duration: '10s', target: 0 },
echo     { duration: '5s', target: 500 },
echo     { duration: '10s', target: 500 },
echo     { duration: '10s', target: 0 },
echo   ],
echo };
echo.
echo const BASE_URL = 'https://jsonplaceholder.typicode.com';
echo.
echo export default function () {
echo   const res = http.get(`${BASE_URL}/posts/1`);
echo   check(res, { 'status is 200': (r) => r.status === 200 });
echo   sleep(0.5);
echo }
) > scripts\spike-test.js

REM Create scripts/soak-test.js
(
echo import http from 'k6/http';
echo import { check, sleep } from 'k6';
echo.
echo export const options = {
echo   stages: [
echo     { duration: '5m', target: 50 },
echo     { duration: '4h', target: 50 },
echo     { duration: '5m', target: 0 },
echo   ],
echo };
echo.
echo const BASE_URL = 'https://jsonplaceholder.typicode.com';
echo.
echo export default function () {
echo   const res = http.get(`${BASE_URL}/posts/1`);
echo   check(res, { 'status is 200': (r) => r.status === 200 });
echo   sleep(1);
echo }
) > scripts\soak-test.js

REM Create docs/test-plan.md
(
echo # Test Plan
echo.
echo ## Test Objectives
echo - Validate system performance under load
echo - Identify breaking points
echo - Ensure response times meet SLAs
echo.
echo ## Test Scenarios
echo 1. Smoke Test - Basic verification
echo 2. Load Test - Normal traffic simulation
echo 3. Stress Test - Find system limits
echo 4. Spike Test - Sudden traffic surge
echo 5. Soak Test - Long duration stability
) > docs\test-plan.md

echo.
echo ✅ Folder structure and files created successfully!
echo.
echo 📁 Structure created:
echo   10-k6/
echo   ├── scripts/ (8 files)
echo   ├── utils/ (2 files)
echo   ├── reports/ (empty)
echo   ├── results/ (empty)
echo   ├── docs/ (1 file)
echo   ├── README.md
echo   └── .env.example
echo.
echo 🚀 Next steps:
echo   1. cd 10-k6
echo   2. k6 run scripts/smoke-test.js
pause