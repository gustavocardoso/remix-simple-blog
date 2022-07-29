const { PrismaClient } = require('@prisma/client')
const casual = require('casual')
const db = new PrismaClient()

const quantity = process.argv[2] ? parseInt(process.argv[2]) : 9

async function seed() {
  await db.$executeRawUnsafe('DELETE FROM post; VACUUM;')
  await Promise.all(
    getPosts().map(post => {
      return db.post.create({ data: post })
    })
  )
}

function getPosts() {
  return [...Array(quantity).keys()].map(() => {
    const title = casual.sentence.replace('.', '')

    return {
      title: title,
      content: casual.sentences(15),
      slug: title.toLowerCase().replaceAll(' ', '-')
    }
  })
}

seed()
