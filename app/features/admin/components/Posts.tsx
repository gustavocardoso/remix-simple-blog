import { Link } from '@remix-run/react'
import type { Post } from '~/features/admin/Admin.types'
import { date } from '~/utils'

export interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <table className='w-full table-auto'>
        <thead>
          <tr className='text-left bg-gray-300 dark:bg-black'>
            <th className='p-4'>Title</th>
            <th className='py-4 pr-4'>Date</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
