import "../style/components/nutrition-card.css";


const NutritionCard = ({ item, value }) => {

    const iconPath = `/src/assets/${item.icon}.svg`;

    return (
        <div className="nutri-card-main-container">
            <div className="nutri-image-container" style={{ backgroundColor: item.bgColor }}>
                <img src={iconPath} alt={item.name} />
            </div>
            <div>
                <p>{value}</p>
                <p>{item.name}</p>
            </div>
        </div>
    )
}

export default NutritionCard;