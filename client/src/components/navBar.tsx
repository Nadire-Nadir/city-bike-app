import { useState } from 'react';
import { SidebarData } from '../utils';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import * as ls from "local-storage";


const NavBar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const logout = () => {
        ls.clear();
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#FFF' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaBars onClick={showSidebar} />
                    </Link>
                    <Link to='/' className='logout'>
                        <AiOutlineUser
                            onClick={logout}
                        />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default NavBar;