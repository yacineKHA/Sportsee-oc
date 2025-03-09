import '../style/components/nutritionCardList.css'
import NutritionCard from "./NutritionCard";
import nutritionData from "../data/NutritionData.json"

const NutritionCardList = ({ keyData }) => {

    return (
        <div className="nutrition-list-main-container">
            {
                nutritionData.map((item) => (
                    <NutritionCard key={item.name} item={item} value={keyData[item.id] + item.unit} />
                ))
            }
        </div>
    )

}

export default NutritionCardList;