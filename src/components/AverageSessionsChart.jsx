import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { daysToWeekdays } from "../utils/dataUtils";
import { useEffect, useState } from "react";
import { getAverageSessions } from "../services/api";

const AverageSessionsChart = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await getAverageSessions(12);
                if(response) {
                    setData(response)
                }
            } catch (error) {
                console.error("Erreur: ", error)
            }
        }

        fetchData();
    },[])


    const transformedData = daysToWeekdays(data);

    return (
        <div style={{ width: "258px", height: "263px", backgroundColor: "red", padding: "5px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={transformedData}>
                    <XAxis dataKey="day" tick={{ fill: "#ffffff", fontSize: 12 }} axisLine={false} />
                    <Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={2} />
                    <Tooltip cursor={{ fill: "#000000" }} wrapperStyle={{ width: 50, height:50, backgroundColor: '#000000' }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AverageSessionsChart;