// Cache handler for /homebrew/* paths
export async function onRequest(context) {
  const { request, env } = context;
  const cache = caches.default;
  
  console.log('🟢 Homebrew function triggered:', request.url);
  
  const cacheKey = new Request(request.url, request);
  let response = await cache.match(cacheKey);
  
  if (response) {
    console.log('✅ Cache HIT:', request.url);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Cache-Status', 'HIT');
    newHeaders.set('X-Served-By', 'CF-Function');
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }
  
  console.log('❌ Cache MISS:', request.url);
  response = await fetch(request);
  
  if (response.ok) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Cache-Control', 'public, max-age=3600'); // 1 hour
    newHeaders.set('X-Cache-Status', 'MISS');
    newHeaders.set('X-Served-By', 'CF-Function');
    
    const cachedResponse = new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
    
    context.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
    return cachedResponse;
  }
  
  return response;
}