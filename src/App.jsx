import './App.css'
import AverageSessionsChart from './components/AverageSessionsChart'
import CircularPieChartProgress from './components/CircularPieChartProgress'
import DailyActivityChart from './components/DailyActivityChart'
import Header from './components/Header'
import RadarGraph from './components/RadarGraph'
import LeftMenu from './components/LeftMenu'
import { useEffect, useState } from 'react'
import { getMainData } from './services/api'
import NutritionCardList from './components/NutritionCardList'


function App() {
  const [keyData, setKeyData] = useState({});
  const [userData, setUserData] = useState({});
  const [todayScore, setTodayScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datafetch = await getMainData(12);
        if (datafetch) {
          setKeyData(datafetch.keyData);
          setUserData(datafetch.userInfos);
          setTodayScore(datafetch.todayScore * 100);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données: ", error);
      }
    };

    fetchData();
  }, [])


  return (
    <div className='app-container'>
      <div>
        <Header />
      </div>
      <div className='app-main-container'>
        <LeftMenu />
        <div className='app-content-container'>
          <div className='app-content-wrapper'>
            <div className='app-title-container'>
              <h2>Bonjour {userData.firstName}</h2>
              <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className='app-chart-section'>
              <div className='app-left-charts-container'>
                <DailyActivityChart />
                <div className='app-bottom-charts-container'>
                  <AverageSessionsChart />
                  <RadarGraph />
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
  )
}

export default App
