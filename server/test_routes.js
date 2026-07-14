const BASE_URL = 'http://localhost:5001/api';

async function runTests() {
  console.log('==================================================');
  console.log('       AURA PERFORMANCE ROUTE SECURITY TEST        ');
  console.log('==================================================\n');

  let token = null;

  // 1. Authenticate Admin
  console.log('[Test 1] Attempting to log in as administrator...');
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'kingpro', password: 'kingpro00' })
    });
    
    const loginData = await loginRes.json();
    if (loginRes.ok && loginData.token) {
      token = loginData.token;
      console.log(`  -> SUCCESS: Logged in. Token received (role: ${loginData.user.role})\n`);
    } else {
      console.log(`  -> FAILED to log in: ${loginData.message || loginRes.statusText}\n`);
    }
  } catch (error) {
    console.log(`  -> ERROR connecting to server: ${error.message}. Is your server running on port 5001?\n`);
    process.exit(1);
  }

  const routesToTest = [
    // Public routes
    {
      name: 'GET /api/products (Public)',
      url: `${BASE_URL}/products`,
      method: 'GET',
      requireAuth: false,
      expectedUnauthStatus: 200,
    },
    {
      name: 'POST /api/orders (Public order placement)',
      url: `${BASE_URL}/orders`,
      method: 'POST',
      body: { items: [] }, // will trigger validation check (400) rather than auth check
      requireAuth: false,
      expectedUnauthStatus: 400,
    },
    // Protected admin routes
    {
      name: 'GET /api/orders (Admin Only)',
      url: `${BASE_URL}/orders`,
      method: 'GET',
      requireAuth: true,
      expectedUnauthStatus: 401,
      expectedAuthStatus: 200,
    },
    {
      name: 'PUT /api/orders/invalid-id/status (Admin Only)',
      url: `${BASE_URL}/orders/invalid-id/status`,
      method: 'PUT',
      body: { orderStatus: 'Shipped' },
      requireAuth: true,
      expectedUnauthStatus: 401,
      expectedAuthStatus: 400, // CastError or validation since the ID is dummy, not 401/403
    },
    {
      name: 'POST /api/products (Admin Only)',
      url: `${BASE_URL}/products`,
      method: 'POST',
      body: { name: 'Test Product' },
      requireAuth: true,
      expectedUnauthStatus: 401,
      expectedAuthStatus: 400, // validation error (missing fields) rather than 401/403
    },
    {
      name: 'PUT /api/products/invalid-id (Admin Only)',
      url: `${BASE_URL}/products/invalid-id`,
      method: 'PUT',
      body: { name: 'Updated name' },
      requireAuth: true,
      expectedUnauthStatus: 401,
      expectedAuthStatus: 400, // CastError or validation rather than 401/403
    },
    {
      name: 'DELETE /api/products/invalid-id (Admin Only)',
      url: `${BASE_URL}/products/invalid-id`,
      method: 'DELETE',
      requireAuth: true,
      expectedUnauthStatus: 401,
      expectedAuthStatus: 500, // CastError or validation returned as 500
    }
  ];

  for (const route of routesToTest) {
    console.log(`--------------------------------------------------`);
    console.log(`Testing: ${route.name}`);
    console.log(`--------------------------------------------------`);

    // A. Unauthenticated Request
    try {
      const res = await fetch(route.url, {
        method: route.method,
        headers: { 'Content-Type': 'application/json' },
        body: route.body ? JSON.stringify(route.body) : undefined
      });
      const status = res.status;
      const passed = status === route.expectedUnauthStatus;
      console.log(`  [UNAUTH] Status: ${status} (Expected: ${route.expectedUnauthStatus}) -> ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    } catch (err) {
      console.log(`  [UNAUTH] Error: ${err.message}`);
    }

    // B. Authenticated Request (if applicable)
    if (route.requireAuth && token) {
      try {
        const res = await fetch(route.url, {
          method: route.method,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: route.body ? JSON.stringify(route.body) : undefined
        });
        const status = res.status;
        const passed = status === route.expectedAuthStatus;
        console.log(`  [AUTH]   Status: ${status} (Expected: ${route.expectedAuthStatus}) -> ${passed ? '✅ PASSED' : '❌ FAILED'}`);
      } catch (err) {
        console.log(`  [AUTH]   Error: ${err.message}`);
      }
    }
    console.log();
  }

  console.log('==================================================');
  console.log('                TESTING COMPLETE                  ');
  console.log('==================================================');
}

runTests();
