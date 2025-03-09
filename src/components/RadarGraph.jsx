import { useEffect, useState } from "react";
import "../style/components/radarGraph.css"
import { Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart, ResponsiveContainer } from 'recharts';
import { getUserPerformance } from "../services/api";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }
};


const RadarGraph = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const getPerfData = async () => {
            const response = await getUserPerformance(12);
            if (response) {
                const formattedData = response.data.map(item => ({
                    ...item,
                    kind: response.kind[item.kind],
                }));
                setData(formattedData);
            }
        }

        getPerfData()
    }, [])
    /*
    const data = [
        {
            subject: 'Intensité',
            A: 120,
            B: 110,
            fullMark: 150,
        },
        {
            subject: 'Vitesse',
            A: 98,
            B: 130,
            fullMark: 150,
        },
        {
            subject: 'Force',
            A: 86,
            B: 130,
            fullMark: 150,
        },
        {
            subject: 'Endurance',
            A: 99,
            B: 100,
            fullMark: 150,
        },
        {
            subject: 'Energie',
            A: 85,
            B: 90,
            fullMark: 150,
        },
        {
            subject: 'Cardio',
            A: 65,
            B: 85,
            fullMark: 150,
        },
    ];
*/
    return (
        <div className='radar-graph-container'>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis
                        dataKey="kind"
                        tick={{
                            fill: "#ffff",
                            fontSize: 10,
                            fontWeight: 500
                        }}
                    />
                    <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RadarGraph;