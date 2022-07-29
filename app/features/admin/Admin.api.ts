import type { Post } from '@prisma/client'
import type { FormFields } from '~/routes/admin/posts/new'
import { db } from '~/utils/db.server'

export async function getPosts(): Promise<Post[]> {
  return await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function savePost(data: FormFields, id?: string): Promise<Post> {
  if (id) {
    return db.post.update({ where: { id }, data })
  }

  return db.post.create({ data })
}

export async function getPost(id: string): Promise<Post | null> {
  return db.post.findUnique({
    where: {
      id
    }
  })
}

export async function deletePost(id: string): Promise<Post> {
  return db.post.delete({ where: { id } })
}
