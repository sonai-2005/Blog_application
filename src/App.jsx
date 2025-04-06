import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Authservice from './appwrite/auth';
import { useRouteLoaderData } from 'react-router-dom';
import { login, logout } from './store/authslice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
function App() {
    //loading
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        Authservice.getCurrent()
  .then((response) => {
    if (response) dispatch(login(response))
    else dispatch(logout())
  })
  .catch((err) => {
    console.error("Error checking user:", err)
    dispatch(logout())
  })
  .finally(() => setloading(false));
    }, [])

    return !loading ? (<>
        <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
            <div className='w-full block'>
                <Header />
                <main>
                    TODO:  <Outlet />
                </main>
                <Footer />

            </div>
        </div>

    </>) : (<><div>
        empty
    </div></>);
}

export default App
