import "../style/components/leftMenuIcon.css"

const LeftMenuIcon = ({icon}) => {

    return (
        <div className="left-menu-icon-container">
            <img src={icon} alt="Icon" />
        </div>
    )
}

export default LeftMenuIcon;