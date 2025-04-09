import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sortUserPlugins } from 'vite';
function Header() {
    const authStatus = useSelector((state) => {
        state.auth.status
    })
    const nagigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header className='py-3 shadow bg-gray-50'>
            <Container>
                <nav className='flex'>
                    <div className='mr-3'>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>
                    <ul>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => { Navigate(item.slug) }}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {/* to render the logout button */}
                        {authStatus && (
                            <li>
                            <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;