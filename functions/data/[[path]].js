// Cache handler for /data/* paths
export async function onRequest(context) {
  const { request, env } = context;
  const cache = caches.default;
  
  console.log('🟢 Data function triggered:', request.url);
  
  // Create cache key
  const cacheKey = new Request(request.url, request);
  
  // Check cache
  let response = await cache.match(cacheKey);
  
  if (response) {
    console.log('✅ Cache HIT:', request.url);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Cache-Status', 'HIT');
    newHeaders.set('X-Served-By', 'CF-Function');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  
  console.log('❌ Cache MISS:', request.url);
  
  // Fetch from origin
  response = await fetch(request);
  
  if (response.ok) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Cache-Control', 'public, max-age=86400'); // 24 hours
    newHeaders.set('X-Cache-Status', 'MISS');
    newHeaders.set('X-Served-By', 'CF-Function');
    
    const cachedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
    
    // Store in cache
    context.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
    
    return cachedResponse;
  }
  
  return response;
}