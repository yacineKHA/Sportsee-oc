import "../style/components/leftMenu.css"
import LeftMenuIcon from "./leftMenuIcon";
import zen from '../assets/zen.svg';
import swim from '../assets/swim.svg';
import bcycle from "../assets/bcycle.svg";
import muscle from '../assets/muscle.svg';

const LeftMenu = () => {
    const iconList = [
        zen,
        swim,
        bcycle,
        muscle
    ]

    return (
        <div className="left-menu-main-container">
            <div>
                
            </div>
            <div className="left-menu-icon-list">
                {iconList.map((icon) =>(
                    <LeftMenuIcon key={icon} icon={icon}/>
                ))}
            </div>
            <div className="left-menu-text">
                <p>Copyright, SportSee 2020</p>
            </div>
        </div>
    )
}

export default LeftMenu;