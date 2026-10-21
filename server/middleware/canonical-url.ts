// Normalise request URLs to one canonical form with a 301 so the same page is
// not indexed under several URLs:
//   - trailing slashes collapsed:      /pl/  -> /pl
//   - locale prefix lower-cased:       /PL   -> /pl   (the router matches it 200)
const LOCALES = ['pl', 'en', 'uk', 'ru']

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  let pathname = url.pathname

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.replace(/\/+$/, '')
  }

  const seg = pathname.split('/')[1] ?? ''
  if (seg && seg !== seg.toLowerCase() && LOCALES.includes(seg.toLowerCase())) {
    pathname = '/' + seg.toLowerCase() + pathname.slice(seg.length + 1)
  }

  if (pathname !== url.pathname) {
    return sendRedirect(event, pathname + url.search, 301)
  }
})
