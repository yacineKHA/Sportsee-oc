import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip, Dot } from "recharts";
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

const CustomDot = (props) => {
    const { cx, cy, payload, index, data, hoveredIndex } = props;
    const isHovered = hoveredIndex === index;

    return (
        <>
            {isHovered && (
                <circle
                    cx={cx}
                    cy={cy}
                    r={10} // Taille du halo
                    fill="rgba(255, 255, 255, 0.34)" // Couleur du halo
                />
            )}
            <Dot
                cx={cx}
                cy={cy}
                r={4} // Taille point sans halo
                fill="#fff"
                stroke="#fff"
                strokeWidth={2}
            />
        </>
    );
};

const CustomCursor = ({ points, hoveredIndex }) => {
    if (!points || !hoveredIndex) return null;

    const { x } = points[0]; // Position X du point sélectionné

    return (
        <rect
            x={x} // Position à partir du point sélectionné
            y={0}
            width="100%" // Recouvre toute la partie droite
            height="100%"
            fill="rgba(0, 0, 0, 0.3)" // Assombrissement
        />
    );
};



const AverageSessionsChart = ({ userId, user_mock }) => {
    const [data, setData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAverageSessions(userId, user_mock);
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
            <ResponsiveContainer className="average-sessions-responsive-container" width="100%" height="100%">
                <LineChart className="average-sessions-line-chart" width={300} height={100} data={transformedData}
                    onMouseMove={(e) => {
                        if (e.activeTooltipIndex !== undefined) {
                            setHoveredIndex(e.activeTooltipIndex);
                        }
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
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
                    <Line
                        dot={<CustomDot hoveredIndex={hoveredIndex} />}

                        type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={2} />
                    <Tooltip 
                        content={CustomTooltip} 
                        cursor={<CustomCursor hoveredIndex={hoveredIndex} />} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AverageSessionsChart;