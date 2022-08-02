import { Outlet, useLocation } from '@remix-run/react'
import CurrentPage from '~/features/admin/components/CurrentPage'
import NavBar from '~/features/admin/components/NavBar'

export default function Admin() {
  const { pathname } = useLocation()

  return (
    <>
      <div className='container wrapper'>
        <div className='flex flex-col justify-between md:flex-row'>
          <div className='flex items-center justify-center'>
            <h1 className='m-0'>Admin</h1>
            <CurrentPage url={pathname} />
          </div>
          <NavBar />
        </div>

        <div className='my-8'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
