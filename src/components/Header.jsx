import "../style/components/header.css";
import logo from "../assets/logo.svg";

const Header = ()=>{
    return(
        <div className="header-container">
            <img src={logo} alt="Logo Sportsee"/>
            <nav className="nav">
                <li>Accueil</li>
                <li>Profil</li>
                <li>Réglage</li>
                <li>Communauté</li>
            </nav>
        </div>
    )

}

export default Header;