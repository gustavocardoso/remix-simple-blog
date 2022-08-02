import { NavLink } from '@remix-run/react'

export default function NavBar() {
  return (
    <>
      <div className='mt-3 md:mt-0 admin-navbar'>
        <ul className='flex justify-center px-4 py-2 font-medium gap-x-4'>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'subnav-link-active' : 'subnav-link')}
              to='posts'
              end
            >
              <div className='flex flex-row items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 10h16M4 14h16M4 18h16'
                  />
                </svg>
                Posts
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'subnav-link-active' : 'subnav-link')}
              to='posts/new'
            >
              <div className='flex flex-row items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                New Post
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}
