import type { Post } from '~/features/admin/Admin.types'
import { redirect } from '@remix-run/node'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { AdminApi } from '~/features/admin/'
import Posts from '~/features/admin/components/Posts'
import { deletePost } from '~/features/admin/Admin.api'

interface LoaderData {
  posts: Post[]
}

export const action: ActionFunction = async ({ request }) => {
  const postId = (await (await request.formData()).get('id')) as string
  console.log('POST ID: ', postId)
  await deletePost(postId)

  return redirect('/admin/posts')
}

export const loader: LoaderFunction = async ({ params }) => {
  return { posts: await AdminApi.getPosts() }
}

export default function () {
  const { posts } = useLoaderData<LoaderData>()

  return <Posts posts={posts} />
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className='container flex flex-col items-center justify-center wrapper'>
      <h1 className='mb-4 text-5xl font-black tracking-tighter text-center text-red-500'>
        There was an error
      </h1>

      <p className='text-lg text-center'>
        <span className='block'>{error.message}</span>
        <span className='block'>Please, use the main navigation to go to a different page.</span>
      </p>
    </div>
  )
}

export function CatchBoundary() {
  return (
    <div className='container flex flex-col items-center justify-center wrapper'>
      <h1 className='mb-4 text-5xl font-black tracking-tighter text-center text-red-500'>
        404 - Not Found!
      </h1>

      <p className='text-lg text-center'>
        <span className='block'>
          'Oops! Looks like you tried to visit a page that does not exist.'
        </span>
        <span className='block'>Please, use the main navigation to go to a different page.</span>
      </p>
    </div>
  )
}
