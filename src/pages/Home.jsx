import React, { useState } from "react";
import Inputs from "../components/Inputs";
import TemperatureAndDetails from "../components/TemperatureAndDetails";
import Forecast from "../components/Forecast";
import axios from "axios";

const Home = () => {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [currentCity, setcurrentCity] = useState('');
	const [favcity, setfavcity] = useState([]);
	const handleSaveCity = () => {
		setfavcity(favcity => [...favcity, currentCity]);
		console.log(currentCity)
		console.log(favcity)
	}
	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(" ");
		setcurrentCity(searchData.label);
		try {
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`).then((res) => {
				console.log(res);
				setCurrentWeather({ city: searchData.label, ...res.data });
			});

			axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`).then((res) => {
				setForecast({ city: searchData.label, ...res.data });
			});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='bg-[#000a18] text-blue-100 py-20 px-24 h-full  justify-center flex '>
			<div className=' flex-col  flex  max-w-[2300px] '>
				<div className="p-2 text-center text-4xl"><h1 >Weather app</h1></div>
				<div className="p-2"><Inputs onSearchChange={handleOnSearchChange} /></div>
				{currentWeather && <div className='bg-gradient-to-b from-[#15bff7]  to-[#1068f3] max-[934px]:h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full'>
					<TemperatureAndDetails data={currentWeather} />
					<button onClick={handleSaveCity} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						SAVE CITY
					</button>
				</div>}
				{forecast && <Forecast data={forecast} />}
			</div>
		</div>
	);
};

export default Home;
