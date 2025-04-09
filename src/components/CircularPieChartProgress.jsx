import "../style/components/circularPieChartProgress.css"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CircularPieChartProgress = ({ percentage }) => {
    const data = [
        { name: "Progress", value: percentage }
    ];

    const data2 = [
        {name: "nothing", value: 1}
    ]

    const COLORS = ["#ff0000", "#333"];


    return (
        <div className='circual-chart-container'>
            <ResponsiveContainer className="circular-responsive-container">
                <PieChart>
                    <Pie
                        data={data2}
                        dataKey="value" cx="50%" cy="50%" outerRadius={63} fill="white" 
                    />

                    <Pie
                        data={data}
                        innerRadius={63} // Rayon intérieur
                        outerRadius={75} // Rayon extérieur
                        startAngle={90} // Commence en haut
                        endAngle={90 - (-360 * (percentage / 100))} // Calcul pourcentage
                        cornerRadius={20} // Bords arrondis
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Texte au centre du cercle */}
            <div className='circular-text-container'>
                <p>{percentage}%</p>
                <span>de votre objectif</span>
            </div>
            <div className="circular-score-container">
                Score
            </div>
        </div>
    );
};

export default CircularPieChartProgress;
