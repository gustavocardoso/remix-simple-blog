import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = async ({ params }) => {
  return {}
}

export const action: ActionFunction = async ({ request, params }) => {
  return {}
}

export default function () {
  const data = useLoaderData()

  return <h1>Content is king!</h1>
}

export const ErrorBoundary = () => {
  return (
    <>
      <h3>Whoops!!!</h3>
    </>
  )
}

export const CatchBoundary = () => {
  return (
    <>
      <h3>Not Found!!!</h3>
    </>
  )
}
