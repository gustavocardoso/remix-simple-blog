const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getPosts().map(post => {
      return db.post.create({ data: post })
    })
  )
}

function getPosts() {
  return [
    {
      title: 'My Awesome Post',
      content:
        'Aliqua minim exercitation incididunt consectetur esse reprehenderit ad adipisicing aliqua magna veniam magna. Proident nisi duis culpa irure cillum. Non aute fugiat veniam anim voluptate velit cupidatat sunt. Lorem exercitation pariatur duis culpa ex et dolore exercitation irure mollit.',
      slug: 'my-awesome-post'
    },
    {
      title: 'Another Cool Post',
      content:
        'Aliqua minim exercitation incididunt consectetur esse reprehenderit ad adipisicing aliqua magna veniam magna. Proident nisi duis culpa irure cillum. Non aute fugiat veniam anim voluptate velit cupidatat sunt. Lorem exercitation pariatur duis culpa ex et dolore exercitation irure mollit.',
      slug: 'another-cool-post'
    },
    {
      title: 'This Post is Really Amazing',
      content:
        'Aliqua minim exercitation incididunt consectetur esse reprehenderit ad adipisicing aliqua magna veniam magna. Proident nisi duis culpa irure cillum. Non aute fugiat veniam anim voluptate velit cupidatat sunt. Lorem exercitation pariatur duis culpa ex et dolore exercitation irure mollit.',
      slug: 'this-post-is-really-amazing'
    },
    {
      title: 'Yet Another Awesome and Cool Post',
      content:
        'Aliqua minim exercitation incididunt consectetur esse reprehenderit ad adipisicing aliqua magna veniam magna. Proident nisi duis culpa irure cillum. Non aute fugiat veniam anim voluptate velit cupidatat sunt. Lorem exercitation pariatur duis culpa ex et dolore exercitation irure mollit.',
      slug: 'yet-another-awesome-cool-post'
    }
  ]
}

seed()
