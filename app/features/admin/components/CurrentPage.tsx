interface CurrentPageProps {
  url: string | any
}

export default function CurrentPage({ url }: CurrentPageProps) {
  let currentPage

  switch (url) {
    case String(url.match(/^\/admin\/posts$/i)):
      currentPage = 'Posts List'
      break
    case String(url.match(/^\/admin\/posts\/new$/i)):
      currentPage = 'New Post'
      break
    case String(url.match(/\/admin\/posts\/.*/i)):
      currentPage = 'Edit Post'
      break
    default:
      currentPage = ''
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
