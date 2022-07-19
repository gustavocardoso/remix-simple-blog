import type { Post } from '~/features/admin/Admin.types'

export interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <h2>Posts</h2>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  )
}
