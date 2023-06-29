import '../styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from './HamburgerMenu';

const NavBar = ({ componentOpen, toggleMenu, toggleNewPost, showNewPost, toggleProfileComponent, postList, setPostList, fullPostList, setFullPostList}) => {

    return (
        <div className='nav-bar'>
            <div className='header'>
                <div className="hamburger-menu">
                    <FontAwesomeIcon icon={faBars} className='hamburger-menu-icon' onClick={toggleMenu}/>
                </div>
                <h1>The Artchive</h1>
            </div>
            {componentOpen && <HamburgerMenu
            componentOpen={componentOpen}
            toggleNewPost={toggleNewPost}
            showNewPost={showNewPost}
            toggleProfileComponent={toggleProfileComponent}
            postList={postList}
            setPostList={setPostList}
            fullPostList={fullPostList}
            setFullPostList={setFullPostList}/>}
        </div>
    )
}

export default NavBar