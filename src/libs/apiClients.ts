// lib/apiClient.ts
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from './wagmi'

const BASE_URL = import.meta.env.VITE_API_URL

export class ApiError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

// Global error interceptor
function handleGlobalErrors(status: number) {
  if (status === 401) {
    // Clear session and disconnect wallet
    localStorage.removeItem('token')
    disconnect(wagmiConfig)
    window.location.href = '/'
  }
}

// Core Request
async function request<T>(
  endpoint: string,
  options?: RequestInit & { params?: Record<string, unknown> },
): Promise<T> {
  const { params, ...fetchOptions } = options ?? {}

  const token = localStorage.getItem('token')
  const headers = new Headers(fetchOptions.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const finalOptions = {
    ...fetchOptions,
    headers,
  }

  const url = new URL(`${BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, String(value))
    })
  }

  let res: Response
  try {
    res = await fetch(url.toString(), finalOptions)
  } catch (err) {
    // Let intentional cancellations bubble up as-is so callers can
    // detect AbortError and ignore it without showing an error state.
    if (err instanceof Error && err.name === 'AbortError') throw err
    // Network failure, DNS error, CORS, etc.
    throw new ApiError(0, 'Network error check your connection')
  }

  if (!res.ok) {
    handleGlobalErrors(res.status)

    // Attempt to parse error body for a server-provided message
    const errorMessage = await res
      .json()
      .then((body) => body?.message ?? res.statusText)
      .catch(() => res.statusText) // fallback if body is not JSON

    throw new ApiError(res.status, errorMessage)
  }

  // 304 Not Modified — browser already resolved this from cache,
  // the Response object will have an empty body so skip parsing.
  if (res.status === 304 || res.headers.get('content-length') === '0') {
    return undefined as T
  }

  // Safe JSON parse
  return res.json().catch(() => {
    throw new ApiError(res.status, 'Invalid JSON response')
  }) as Promise<T>
}

// HTTP Methods
export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, unknown>, signal?: AbortSignal) =>
    request<T>(endpoint, { method: 'GET', params, signal }),

  post: <T>(endpoint: string, body: unknown, signal?: AbortSignal) =>
    request<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    }),

  put: <T>(endpoint: string, body: unknown, signal?: AbortSignal) =>
    request<T>(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    }),

  delete: <T>(endpoint: string, signal?: AbortSignal) =>
    request<T>(endpoint, { method: 'DELETE', signal }),
}
