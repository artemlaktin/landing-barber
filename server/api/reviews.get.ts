interface SerpReview {
    user: { name: string; thumbnail?: string }
    rating: number
    date: string
    snippet?: string
    source?: string
}

interface SerpResponse {
    reviews?: SerpReview[]
    error?: string
}

const SUPPORTED_HL = ['pl', 'en', 'uk', 'ru']

export default defineCachedEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const requested = String(getQuery(event).locale ?? 'pl')
    const hl = SUPPORTED_HL.includes(requested) ? requested : 'pl'

    // TODO: `data_id` must point to the Grizzly Szczecin Google Business listing.
    // The current value returns reviews for an unrelated location (e.g. a review
    // mentioning the "Holosiivo" district, which is in Kyiv, not Szczecin).
    // Grab the correct `data_id` / `place_id` for each Szczecin branch and, ideally,
    // merge reviews from all three.
    const data = await $fetch<SerpResponse>('https://serpapi.com/search', {
        params: {
            engine: 'google_maps_reviews',
            data_id: '0x0:0xf206fbfc297b42a1',
            hl,
            sort_by: '1',
            api_key: config.serpApiKey,
        },
    })

    if (!data.reviews) return []

    return data.reviews
        .filter(r => r.snippet && r.rating >= 4)
        .map((r, i) => ({
            id: i + 1,
            name: r.user.name,
            platform: 'google' as const,
            avatar: r.user.thumbnail ?? '',
            text: r.snippet ?? '',
        }))
}, {
    maxAge: 60 * 60 * 24, // 24 hours
    name: 'google-reviews',
    getKey: (event) => `google-reviews-${getQuery(event).locale ?? 'pl'}`,
})
