import { Link, useLocation } from 'react-router-dom'

import { MdLogin, MdLogout, MdPersonAdd, MdPerson } from "react-icons/md";

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href} className={`${isActive ? 'font-medium' : 'font-light'}`}>
      { children }
    </Link>
  )
}

const Navbar = () => {
  const isAuthenticated = false;

  return (
    <nav className='w-full h-16 flex items-center justify-between p-8 bg-zinc-800 text-white'>
      <div className='flex flex-row gap-16'>
        <Link to='/' className='flex items-center'>
          <h1 className='text-2xl font-semibold'> OpenJudge </h1>
        </Link>

        <div className='flex items-center gap-10'>
          <NavLink href='/'> Home </NavLink>
          <NavLink href='/problems'> Problems </NavLink>
          <NavLink href='/about'> About </NavLink>
        </div>
      </div>

      <div className='flex flex-row gap-8'>
        { isAuthenticated ? (
          <>
            <Link to='/profile' className='flex items-center gap-2'>
              <MdPerson size={20} />
              <p> Profile </p>
            </Link>

            <Link to='/logout' className='flex items-center gap-2'>
              <MdLogout size={18} />
              <p> Logout </p>
            </Link>
          </>
        ) : (
          <>
            <Link to='/login' className='flex items-center gap-2'>
              <MdLogin size={18} />
              <p> Login </p>
            </Link>

            <Link to='/login' className='flex items-center gap-2'>
              <MdPersonAdd size={20} />
              <p> Register </p>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
