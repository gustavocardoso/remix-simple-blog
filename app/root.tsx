import type { MetaFunction, LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from '@remix-run/react'
import React from 'react'

import globalStyles from '~/styles/app.css'
import NavBar from './components/NavBar'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: globalStyles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix - Simple Blog',
  viewport: 'width=device-width,initial-scale=1'
})

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang='en'>
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <NavBar />
        </header>

        {children}

        <ScrollRestoration />
        <Scripts />
        <script src='/js/app.js'></script>
        <LiveReload />
      </body>
    </html>
  )
}

export default function app() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = 'Oops! Looks like you tried to visit a page that you do not have access to.'
      break
    case 404:
      message = 'Oops! Looks like you tried to visit a page that does not exist.'
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className='container wrapper flex items-center justify-center flex-col'>
        <h1 className='text-5xl font-black text-red-500 tracking-tighter mb-4 text-center'>
          {caught.status} - {caught.statusText}!
        </h1>

        <p className='text-lg text-center'>
          <span className='block'>{message}</span>
          <span className='block'>Please, use the main navigation to go to a different page.</span>
        </p>
      </div>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log(`Error: ${error}`)

  return (
    <Document title='Error'>
      <div className='container wrapper flex items-center justify-center flex-col'>
        <h1 className='text-5xl font-black text-red-500 tracking-tighter mb-4 text-center'>
          There was an error
        </h1>

        <p className='text-lg text-center'>
          <span className='block'>{error.message}</span>
          <span className='block'>Please, use the main navigation to go to a different page.</span>
        </p>
      </div>
    </Document>
  )
}
