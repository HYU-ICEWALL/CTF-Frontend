import '../styles/Header.css';
import Logo from '../assets/logo.png';

function Header() {
    return (
        <>
            <nav>
                <ul>
                    <img src={Logo}></img>
                    <a href="/"><li>Home</li></a>
                    <a href="/scoreboard"><li>Scoreboard</li></a>
                    <a href="/problems"><li>Problems</li></a>
                </ul>
            </nav>
        </>
    );
}

export default Header;