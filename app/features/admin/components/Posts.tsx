import { Link, useFetcher } from '@remix-run/react'
import type { Post } from '~/features/admin/Admin.types'
import { date } from '~/utils'

export interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  const fetcher = useFetcher()

  return (
    <>
      <table className='w-full table-auto'>
        <thead>
          <tr className='text-left bg-gray-300 dark:bg-black'>
            <th className='p-4'>Title</th>
            <th className='py-4'>Date</th>
            <th className='py-4 pr-4'></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr
              key={post.id}
              className='p-4 text-left transition duration-300 ease-in-out odd:bg-white dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            >
              <td className='p-4'>
                <Link to={`/admin/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td className='py-4 pr-4'>{date(new Date(post.updatedAt))}</td>
              <td className='flex flex-row justify-end gap-4 py-4 pr-4'>
                <Link
                  to={post.id}
                  className='flex flex-row items-center justify-center w-24 p-2 text-sm text-gray-900 no-underline transition-all bg-gray-300 rounded hover:bg-blue-500 hover:text-white'
                  aria-label='Edit post'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>{' '}
                  Edit
                </Link>
                <fetcher.Form method='post'>
                  <input type='hidden' name='id' value={post.id} />
                  <button
                    type='submit'
                    value='delete'
                    className='flex flex-row items-center justify-center w-24 p-2 text-sm text-gray-900 bg-gray-300 rounded hover:bg-red-500 hover:text-white'
                    aria-label='Delete post'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                    Delete
                  </button>
                </fetcher.Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
