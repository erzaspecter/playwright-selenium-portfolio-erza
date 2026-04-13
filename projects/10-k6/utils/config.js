// Global configuration
export const BASE_URL = __ENV.BASE_URL || 'https://jsonplaceholder.typicode.com';
export const TIMEOUT = __ENV.TIMEOUT || 30000;
export const THRESHOLDS = {
  http_req_duration: ['p(95)<500'],
  http_req_failed: ['rate<0.01'],
};
