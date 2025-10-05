export function buildQueryString(params: Record<string, string>): string {
  return Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([k, v]) => {
      const encodedKey = k.startsWith('$') ? k : encodeURIComponent(k)
      const safeValue = decodeURIComponent(encodeURIComponent(v))
        // autoriser certains caractères OData courants
        .replace(/%2C/g, ',')
        .replace(/%2F/g, '/')
        .replace(/%20/g, ' ')
        .replace(/%3D/g, '=')
        .replace(/%27/g, "'")
      return `${encodedKey}=${safeValue}`
    })
    .join('&')
}
