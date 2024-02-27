import '../CSS/Navbar.css'
function Navbar() {
    return (
        <>
        <header class="header_">
           <div class="container">
            <div class="left">
                <img src="logo.png" alt="Coding Platform Logo"></img>
            </div>
            <div class="mid">
                <ul class="navbar">
                    <li><a href="#About">About Us</a></li>
                    <li><a href="#Problrms">Problems</a></li>
                    <li><a href="#Progress">Progress</a></li>
                </ul>
            </div>

            <div class="right">
                <button class="btn">Login</button>
                <button class="btn">Sign Up</button>
            </div>
        </div>
        </header>
        </>
    )
}

export default Navbar;