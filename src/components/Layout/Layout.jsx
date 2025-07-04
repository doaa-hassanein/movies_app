
import { Outlet } from 'react-router-dom';
import Header from './../header/Header';
import Footer from './../Footer/Footer';

const Layout = () => {
  return (
    <div>
        
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout