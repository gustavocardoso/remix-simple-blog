import type { Post } from '@prisma/client'
import { db } from '~/utils/db.server'

export async function getPosts(): Promise<Post[]> {
  return await db.post.findMany()
}
