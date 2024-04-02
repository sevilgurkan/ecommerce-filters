type FetcherResponse<T> = {
  success: boolean
  message: string | null
  payload: T
}

const baseUrl = 'http://localhost:8080'

export async function fetcher<T>(
  url: string,
  body: T | null = null,
  config: Omit<RequestInit, 'body'> = {}
) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: body ? config?.method || 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    })

    const data = (await response.json()) as FetcherResponse<T>

    if (!data.success) {
      throw new Error(data?.message || 'Something went wrong')
    }

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
