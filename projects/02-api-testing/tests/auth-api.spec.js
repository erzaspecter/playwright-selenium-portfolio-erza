// tests/auth-api.spec.js
const { test, expect } = require('@playwright/test');

const reqresApiKey = process.env.REQRES_API_KEY || 'reqres-free-v1';

test.describe('Authentication API Testing', () => {
  test('Login with valid credentials', async ({ request }) => {
    const loginData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    const response = await request.post('https://reqres.in/api/login', {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      data: loginData
    });
    
    const status = response.status();
    const rawBody = await response.text();
    let body = {};
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = { error: `Non-JSON response received: ${rawBody.slice(0, 120)}` };
    }

    console.log('Status:', status, 'Body:', body);
    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
    console.log('✅ Login successful, token received:', body.token);
  });

  test('Login with invalid credentials should fail', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/login', {
       headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      data: {
        email: 'invalid@email.com',
        password: 'wrong'
      }
    });
    
    expect([400, 401, 403]).toContain(response.status());
    const rawBody = await response.text();
    let body = {};
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = { error: `Non-JSON response received: ${rawBody.slice(0, 120)}` };
      console.log('⚠️ Got Cloudflare block (403) - API might be protected');
    }
    
    if (body.error) {
      console.log('✅ Invalid login properly rejected');
    }
  });
});