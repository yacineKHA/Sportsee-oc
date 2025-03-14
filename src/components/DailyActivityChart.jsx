import "../style/components/dailyActivityChart.css"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { getMinValue, getMaxValue } from "../utils/dataUtils";
import { useEffect, useState } from "react";
import { getActivityData } from "../services/api";

const CustomLegend = ({ payload }) => {
    return (
        <div className="legend-main-container">
            {payload.map((entry, index) => (
                <div key={index} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: entry.color }}></span>
                    <p>{entry.value}</p>
                </div>
            ))}
        </div>
    );
};


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="tooltip-main-container">
                <p>{`${payload[0]?.value} kg`}</p>
                <p>{`${payload[1]?.value} Kcal`}</p>
            </div>
        );
    }
};

const DailyActivityChart = () => {
    const [data, setData] = useState([]);

    const minPoids = getMinValue(data, "poids");
    const maxPoids = getMaxValue(data, "poids");

    const minCalories = getMinValue(data, "calories");
    const maxCalories = getMaxValue(data, "calories");

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const fetchData = await getActivityData(12);
                if (fetchData) {
                    setData(fetchData);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'activité", error);
            }
        };

        fetchActivityData();

    }, []);


    return (
        <div className="daily-activity-main-container">
            <div className="daily-activity-title">
                <p>
                    Activité quotidienne
                </p>
            </div>
            <ResponsiveContainer className="daily-activity-responsive-container">

                <BarChart data={data} barSize={10}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} />
                    <YAxis yAxisId="weight"
                        axisLine={false}
                        domain={[minPoids, maxPoids]}
                        orientation="right" />
                    <YAxis yAxisId="cal" axisLine={false} domain={[minCalories, maxCalories]} hide />
                    <Tooltip content={CustomTooltip} cursor={{ fill: "#C4C4C480" }} />
                    <Legend
                        content={CustomLegend}
                    />
                    <Bar dataKey="kilogram" fill="#282D30" name="Poids (kg)" yAxisId="weight" radius={[20, 20, 0, 0]} />
                    <Bar dataKey="calories" fill="#ff0000" name="Calories brûlées (kCal)" yAxisId="cal" radius={[20, 20, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
};

export default DailyActivityChart;