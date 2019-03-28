import { RequestFactoryType } from './type'

export interface FetchRequestFactoryOptions {
  requestInit: RequestInit
}

const querystring = (obj: any) =>
  Object.keys(obj)
    .reduce(function(previous, key) {
      previous.push(key + '=' + encodeURIComponent(obj[key]))
      return previous
    }, [])
    .join('&')

const pathBuilder = (domain: string, path: string, query: any): string => {
  const hasQuery = query && Object.keys(query).length > 0

  return [
    domain,
    path,
    hasQuery && (path.includes('?') ? '&' : '?'),
    hasQuery && querystring(query)
  ].join('')
}

export const FetchRequestFactory: (
  options: FetchRequestFactoryOptions
) => RequestFactoryType = options => (
  path,
  query,
  body,
  formData,
  headers,
  method,
  configuration
) => {
  const headersObject =
    options.requestInit.headers && typeof options.requestInit.headers === 'function'
      ? options.requestInit.headers
      : new Headers()

  Object.entries(headers).forEach(([key, value]) => {
    headersObject.set(key, String(value))
  })

  let fetchOptions: RequestInit = Object.assign({}, options.requestInit, {
    method: method,
    headers: headersObject
  })
  if (body && typeof body === 'string') {
    fetchOptions.body = body
  } else if (body && typeof body === 'object' && body != null && Object.keys(body).length > 0) {
    fetchOptions.body = JSON.stringify(body)
  }

  if (formData && Object.keys(formData).length > 0) {
    fetchOptions.body = Object.keys(formData).reduce((data, key) => {
      data.append(key, formData[key])
      return data
    }, new FormData())
  }

  return fetch(pathBuilder(configuration.domain, path, query), fetchOptions)
}
