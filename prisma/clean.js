const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function clean() {
  await db.$executeRawUnsafe('DELETE FROM post; VACUUM;')
}

clean()
