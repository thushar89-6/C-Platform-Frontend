import '../CSS/Navbar.css'
function Navbar() {
    return (
        <>
        <header className="header_">
           <div className="container">
            <div className="left">
                <img src="Logo.png" alt="Coding Platform Logo"></img>
            </div>
            <div className="mid">
                <ul className="navbar">
                    <li><a href="#About">About Us</a></li>
                    <li><a href="#Problrms">Problems</a></li>
                    <li><a href="#Progress">Progress</a></li>
                </ul>
            </div>

            <div className="right">
                <button className="btn">Login</button>
                <button className="btn">Sign Up</button>
            </div>
        </div>
        </header>
        </>
    )
}

export default Navbar;