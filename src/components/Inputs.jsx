import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from 'axios';
function Inputs({ onSearchChange }) {
	const [search, setSearch] = useState(null);

	const handleOnchange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	const loadOptions = (inputValue) => {
		return axios
			.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`, {
				headers: {
					'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_KEY}`,
					'X-RapidAPi-Host': 'wft-geo-db.p.rapidapi.com',
				},
			})
			.then((res) => {
				// console.log(res);
				return {
					options: res.data.data.map((city) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.countryCode}`,
						};
					}),
				};
			})
			.catch((error) => {
				console.log("error.message", error.message);
			});
	};
	return (
		<div className=' flex flex-row'>
			<div className=' flex flex-row items-center w-full justify-center  '>
				<div className=' flex flex-row space-x-4 items-center'>
					<AsyncPaginate
						debounceTimeout={600}
						onChange={handleOnchange}
						loadOptions={loadOptions}
						value={search}
						type='text'
						placeholder='Search for city...'
						className=' focus:outline-none  font-light capitalize placeholder:lowercase placeholder:text-[#000000] text-black w-[250px] z-40'
					/>
				</div>
			</div>
		</div>
	);
}

export default Inputs;
