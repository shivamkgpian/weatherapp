import React from "react";
// #focasting

const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const Forecast = ({ data }) => {
	const daysInWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(daysInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, daysInWeek));
	return (
		<div>
			<div className=' flex-col  items-center justify-center my-4 mt-5 text-center'>
				<p className=' text-white items-center font-medium capitalize'>5 Days Prediction</p>
			</div>
			<div className=' flex flex-wrap text-white '>
				{data.list.splice(0, 5).map((item, idx) => (
					<div
						key={idx}
						className=' flex flex-row max-[934px]:flex-col max-[934px]:justify-center justify-between text-center items-center border-[1px] py-4 px-8 w-full m-2 border-[#162b45] rounded-[40px] h-[200px] '
					><p className='text-[#667689] font-light text-md'>{forecastDays[idx]}</p>
						<p className=''>23&deg;</p>

						<img
							src={`icons/${item.weather[0].icon}.svg`}
							alt=''
							className=' my-1'
						/>
						<p className='text-[#667689] font-light text-md'>{item.weather[0].description}</p>

					</div>
				))}
			</div>
		</div>


	);
};

export default Forecast;
