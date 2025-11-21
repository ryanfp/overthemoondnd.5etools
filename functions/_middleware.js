// Cloudflare Pages Function - Cache Middleware
// This runs on every request to your Pages site

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const cache = caches.default;
  
  // Only cache GET requests
  if (request.method !== 'GET') {
    return next();
  }
  
  // Create cache key
  const cacheKey = new Request(url.toString(), request);
  
  // Check cache
  let response = await cache.match(cacheKey);
  
  if (response) {
    console.log(`Cache HIT: ${url.pathname}`);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Cache-Status', 'HIT');
    newHeaders.set('X-Served-By', 'Pages-Function');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  
  console.log(`Cache MISS: ${url.pathname}`);
  
  // Not in cache, get from origin
  response = await next();
  
  // Only cache successful responses
  if (response.ok) {
    const responseToCache = response.clone();
    
    // Determine cache duration
    let cacheDuration = 3600; // 1 hour default
    
    if (url.pathname.includes('/homebrew/')) {
      cacheDuration = 3600; // 1 hour
    } else if (url.pathname.includes('/data/')) {
      cacheDuration = 86400; // 24 hours
    } else if (url.pathname.endsWith('.json')) {
      cacheDuration = 3600;
    } else if (url.pathname.match(/\.(js|css)$/)) {
      cacheDuration = 604800; // 7 days
    } else if (url.pathname.endsWith('.html')) {
      cacheDuration = 600; // 10 minutes
    } else {
      // Don't cache other files
      return response;
    }
    
    // Add cache headers
    const newHeaders = new Headers(responseToCache.headers);
    newHeaders.set('Cache-Control', `public, max-age=${cacheDuration}`);
    newHeaders.set('X-Cache-Status', 'MISS');
    newHeaders.set('X-Cache-Duration', cacheDuration.toString());
    newHeaders.set('X-Served-By', 'Pages-Function');
    
    const cachedResponse = new Response(responseToCache.body, {
      status: responseToCache.status,
      statusText: responseToCache.statusText,
      headers: newHeaders
    });
    
    // Store in cache (background)
    context.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
    
    return cachedResponse;
  }
  
  return response;
}