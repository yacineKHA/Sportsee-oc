import { useNavigate } from "react-router-dom";
import "../style/components/userSelection.css";

const UserSelection = () => {
    const users = [12, 18];

    const navigate = useNavigate();

    return (
        <div className="user-selection">
            <h2>Sélectionnez un utilisateur</h2>
            <div className="user-buttons">
                {users.map(id => (
                    <button className="user-button" key={id} onClick={() => navigate(`/user/${id}`)}>
                        Utilisateur {id}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default UserSelection;