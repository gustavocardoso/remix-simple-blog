import { Outlet } from '@remix-run/react'
import NavBar from '~/features/admin/components/NavBar'

export default function Admin() {
  return (
    <>
      <div className='container wrapper'>
        <div className='flex flex-col justify-between md:flex-row'>
          <h1 className='m-0'>Admin</h1>
          <NavBar />
        </div>

        <Outlet />
      </div>
    </>
  )
}
