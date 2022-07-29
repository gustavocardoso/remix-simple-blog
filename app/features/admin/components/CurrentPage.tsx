interface CurrentPageProps {
  url: string
}

export default function CurrentPage({ url }: CurrentPageProps) {
  let currentPage

  switch (url) {
    case '/admin/posts':
      currentPage = 'Posts List'
      break
    case '/admin/posts/new':
      currentPage = 'New Post'
      break
    default:
      currentPage = null
  }

  return (
    <>
      {currentPage && (
        <div className='flex items-center justify-center'>
          <span className='ml-2'> - </span>
          <p className='m-0 ml-2 text-3xl font-medium leading-tight text-blue-500'>{currentPage}</p>
        </div>
      )}
    </>
  )
}
