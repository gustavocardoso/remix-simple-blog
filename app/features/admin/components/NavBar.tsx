import { NavLink } from '@remix-run/react'

export default function NavBar() {
  return (
    <>
      <div className='mt-3 md:mt-0 admin-navbar'>
        <ul className='flex justify-center px-4 py-2 font-medium bg-white rounded dark:bg-gray-800 gap-x-4'>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'subnav-link-active' : 'subnav-link')}
              to='posts'
              end
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'subnav-link-active' : 'subnav-link')}
              to='posts/new'
            >
              New Post
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}
