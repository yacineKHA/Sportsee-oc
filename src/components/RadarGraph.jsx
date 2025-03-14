import { useEffect, useState } from "react";
import "../style/components/radarGraph.css"
import { Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart, ResponsiveContainer } from 'recharts';
import { getUserPerformance } from "../services/api";



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

    return (
        <div className='radar-graph-container'>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis
                        dataKey="kind"
                        tick={{
                            fill: "#ffff",
                            fontSize: 9,
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