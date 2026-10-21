export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      const token = useCookie('token')
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        }
      }
    },

    onResponseError({ response }) {
      if (import.meta.client && response.status === 401) {
        navigateTo('/login')
      }
    },
  })

  return {
    provide: { api },
  }
})
