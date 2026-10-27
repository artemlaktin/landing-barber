interface SerpReview {
    review_id?: string
    user: { name: string; thumbnail?: string }
    rating: number
    date: string
    iso_date?: string
    snippet?: string
    source?: string
}

interface SerpResponse {
    place_info?: { rating?: number; reviews?: number }
    reviews?: SerpReview[]
    error?: string
}

const SUPPORTED_HL = ['pl', 'en', 'uk', 'ru']

// Google Maps `data_id` of each Szczecin branch (resolved from the maps links in LocationsSection.vue)
const PLACES = {
    mickiewicza: '0x47aa090020ba1287:0x75487d637ec0fbc6',
    piastow:     '0x47aa093f08d1b195:0x1443b34129c9bf44',
    niebuszewo:  '0x47aa09e62cf32683:0xa9b580ef60e26f56',
}

export default defineCachedEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const requested = String(getQuery(event).locale ?? 'pl')
    const hl = SUPPORTED_HL.includes(requested) ? requested : 'pl'

    const results = await Promise.all(
        Object.entries(PLACES).map(async ([place, dataId]) => {
            try {
                const data = await $fetch<SerpResponse>('https://serpapi.com/search', {
                    params: {
                        engine: 'google_maps_reviews',
                        data_id: dataId,
                        hl,
                        sort_by: 'newestFirst',
                        api_key: config.serpApiKey,
                    },
                })
                return { place, data }
            } catch (e) {
                console.error(`[reviews] failed to fetch ${place}:`, e)
                return { place, data: {} as SerpResponse }
            }
        }),
    )

    // Average rating across branches, weighted by number of reviews
    let ratingSum = 0
    let ratingCount = 0
    for (const { data } of results) {
        const info = data.place_info
        if (info?.rating && info.reviews) {
            ratingSum += info.rating * info.reviews
            ratingCount += info.reviews
        }
    }
    const rating = ratingCount ? Math.round((ratingSum / ratingCount) * 10) / 10 : 5

    const reviews = results
        .flatMap(({ place, data }) => (data.reviews ?? []).map((r, i) => ({ place, r, i })))
        .filter(({ r }) => r.snippet && r.rating >= 4)
        .sort((a, b) => (b.r.iso_date ?? '').localeCompare(a.r.iso_date ?? ''))
        .map(({ place, r, i }) => ({
            id: r.review_id ?? `${place}-${i}`,
            name: r.user.name,
            platform: 'google' as const,
            avatar: r.user.thumbnail ?? '',
            rating: r.rating,
            text: r.snippet ?? '',
        }))

    return { rating, reviews }
}, {
    maxAge: 60 * 60 * 24 * 5, // 5 days
    name: 'google-reviews',
    getKey: (event) => `google-reviews-v2-${getQuery(event).locale ?? 'pl'}`,
})
