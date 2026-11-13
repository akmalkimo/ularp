import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {

    const [menuChecked, setMenuChecked] = useState(false)
    const [scrolled, setScrolled] = useState(false);

    const menuRef = useRef(null)
    const row1Ref = useRef(null)
    const row2Ref = useRef(null)
    const row3Ref = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleMenu(){
        if(!menuChecked){
            setTimeout(() => {
                menuRef.current.style.transform = "translateX(0)";
                menuRef.current.style.transition = "transform 0.3s ease-out";
            }, 100)
                menuRef.current.style.display = "flex"
                row1Ref.current.className = "hamburgerRow1Checked";
                row2Ref.current.className = "hamburgerRow2Checked";
                row3Ref.current.className = "hamburgerRow3Checked";
                setMenuChecked(true);
        }else {
            menuRef.current.style.transform = "translateX(100%)";
            row1Ref.current.className = "hamburgerRow1";
            row2Ref.current.className = "hamburgerRow2";
            row3Ref.current.className = "hamburgerRow3";
            setMenuChecked(false);
        }
    }

  return (
    <header className={scrolled ? "header scrolled" : "header"}>
        <Link to="/"><img src="/media/headerLogo.svg" alt="our logo" className='headerLogo' width="70px" height="67px" /></Link>
        <aside className="menu" ref={menuRef}>
            <nav className='mobileNav'>
                <a href="/#Hero" onClick={handleMenu}><i>Home</i></a>
                <a href="/#Perks" onClick={handleMenu}><i>Why choose us</i></a>
                <a href="/#About" onClick={handleMenu}><i>About</i></a>
                <a href="/#Products" onClick={handleMenu}><i>Products</i></a>
                <a href="/#Our-work" onClick={handleMenu}><i>View our work</i></a>
                <a href="/#ContactUs" onClick={handleMenu}><i>Contact Us</i></a>
            </nav>
        </aside>
        <nav className="pcNav">
            <a href="#Hero">Home</a>
            <a href="#Perks">Why choose us</a>
            <a href="#About">About</a>
            <a href="#Products">Products</a>
            <a href="#Our-work">View our work</a>
            <a href="#ContactUs">Contact Us</a>
        </nav>
        <div className="CTAWrapper">
            <div className="hamburger" onClick={handleMenu}>
                <div className="hamburgerRow1" ref={row1Ref}></div>
                <div className="hamburgerRow2" ref={row2Ref}></div>
                <div className="hamburgerRow3" ref={row3Ref}></div>
            </div>
        </div>
    </header>
  )
}

export default Header
