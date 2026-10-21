import type { AsyncDataOptions, NuxtError } from '#app'

export async function useSafeAsyncData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: AsyncDataOptions<T>,
) {
  const result = await useAsyncData<T>(key, fetcher, options)

  if (result.error.value) {
    const err = result.error.value as NuxtError
    console.error(`[${key}]`, err.statusCode, err.message)
  }

  return result
}
