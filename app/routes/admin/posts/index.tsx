import type { Post } from '~/features/admin/Admin.types'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { AdminApi } from '~/features/admin/'
import Posts from '~/features/admin/components/Posts'

interface LoaderData {
  posts: Post[]
}

export const action: ActionFunction = async () => {
  console.log('PASSING THROUGH THE ACTION FUNCTION')

  return {}
}

export const loader: LoaderFunction = async ({ params }) => {
  return { posts: await AdminApi.getPosts() }
}

export default function () {
  const { posts } = useLoaderData<LoaderData>()

  return <Posts posts={posts} />
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
