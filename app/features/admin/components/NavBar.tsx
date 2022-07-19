import { NavLink } from '@remix-run/react'

export default function NavBar() {
  const activeStyle = {
    color: 'orange'
  }

  return (
    <>
      <div className='admin-navbar'>
        <ul className='flex px-4 py-2 font-medium bg-white rounded dark:bg-gray-800 gap-x-4'>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'subnav-link-active' : 'subnav-link')}
              to='/admin/posts'
              end
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'subnav-link-active' : 'subnav-link')}
              to='/admin/posts/new'
            >
              New Post
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}
