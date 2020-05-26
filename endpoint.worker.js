addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const pattern = /^\/package\/([0-9a-zA-Z_\-=]+)\/(\w+\.\w+)$/

const handleRequest = async request => {
  const notFound = new Response(null, { status: 404 })
  const path = new URL(request.url).pathname
  const [matched, base64Url, fileName] = pattern.exec(path || '') || []
  if (!matched) return notFound
  let url = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  try { url = new URL(atob(url)) } catch(_) { url = null }
  if (!url) return notFound
  const headers = new Headers(request.headers)
  headers.set('host', url.host)
  headers.delete('cookie')
  const { method, body } = request
  return fetch(url, { method, headers, body })
}