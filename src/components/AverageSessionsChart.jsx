import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { daysToWeekdays } from "../utils/dataUtils";
import { useEffect, useState } from "react";
import { getAverageSessions } from "../services/api";
import '../style/components/averageSessions.css'

const CustomTooltip = ({ active, payload, label, setHoveredIndex, data }) => {
    if (active && payload && payload.length) {

        return (
            <div className="average-sessions-tooltip-container">
                <p>{`${payload[0].value} min`}</p>
            </div>
        );
    }
    return null;
};

const AverageSessionsChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAverageSessions(12);
                if (response) {
                    setData(response)
                }
            } catch (error) {
                console.error("Erreur: ", error)
            }
        }

        fetchData();
    }, [])


    const transformedData = daysToWeekdays(data);

    return (
        <div className="average-sessions-main-container">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={transformedData}>
                    <text
                        x={20}
                        y={20}
                        fill="rgba(255, 255, 255, 0.6)"
                        fontSize={14}
                        fontWeight="500"
                    >
                        Durée moyenne des sessions
                    </text>
                    <XAxis dataKey="day" tick={{ fill: "#ffffff", fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={2} />
                    <Tooltip content={CustomTooltip} cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AverageSessionsChart;