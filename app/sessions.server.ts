import { createCookieSessionStorage } from '@remix-run/node'

// https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage
export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: [process.env.SESSION_COOKIE_SECRET!],
    sameSite: 'lax'
  }
})
