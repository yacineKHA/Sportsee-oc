import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AverageSessionsChart from "../components/AverageSessionsChart";
import CircularPieChartProgress from '../components/CircularPieChartProgress';
import DailyActivityChart from '../components/DailyActivityChart';
import Header from '../components/Header';
import RadarGraph from '../components/RadarGraph';
import LeftMenu from '../components/LeftMenu';
import { getMainData } from '../services/api';
import NutritionCardList from '../components/NutritionCardList';
import UserSelection from '../components/UserSelection';
import "../style/pages/dashboard.css"


const Dashboard = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [keyData, setKeyData] = useState({});
    const [userData, setUserData] = useState({});
    const [todayScore, setTodayScore] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const datafetch = await getMainData(userId, false);

                if (datafetch) {
                    setKeyData(datafetch.keyData || {});
                    setUserData(datafetch.userInfos || {});
                    setTodayScore((datafetch.todayScore ?? datafetch.score) * 100);
                } else {
                    setError("Aucune donnée disponible");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
                setError("Erreur de chargement des données");
                navigate('/');
            }
        };

        fetchData();
    }, [userId]);


    if (!userId) {
        return (
            <div className="app-container">
                <UserSelection />
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <Header />
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className='app-container'>
            <div>
                <Header />
            </div>
            <div className='app-main-container'>
                <div>
                    <LeftMenu />
                </div>
                <div className='app-content-container'>
                    <div className='app-content-wrapper'>
                        <div className='app-title-container'>
                            <h2>Bonjour <span>{userData.firstName}</span></h2>
                            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                        </div>
                        <div className='app-chart-section'>
                            <div className='app-left-charts-container'>
                                <DailyActivityChart userId={userId} user_mock={false} />
                                <div className='app-bottom-charts-container'>
                                    <AverageSessionsChart userId={userId} user_mock={false} />
                                    <RadarGraph userId={userId} user_mock={false} />
                                    <CircularPieChartProgress percentage={todayScore} />
                                </div>
                            </div>
                            <div>
                                <NutritionCardList keyData={keyData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;