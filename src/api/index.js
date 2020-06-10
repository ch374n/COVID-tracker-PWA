import axios from 'axios' 
import { useState, useEffect } from 'react' 

export const fetchData = async (country) => {
	
	const url = `https://covid19.mathdro.id/${country ? `api/countries/${country}` : 'api'}`
	try {
		const response = await axios.get(url) 
		console.log(response) 
		return response.data 
	} catch(e) {
		console.log(e) 
		throw new Error(e)
	}
}

export const fetchCountries = async () => {
	const url = 'https://covid19.mathdro.id/api/countries'

	try {
		const response = await axios.get(url) 
		console.log(response) 
		return response.data.countries.map(({ name })=> ({ value: name, label: name }))
	} catch(e) {
		console.log(e) 
		throw new Error(e)
	}
}

export const fetchDailyData = async () => {
	const url = 'https://covid19.mathdro.id/api/daily'

	try {
		const response = await axios.get(url) 
		console.log(response) 
		return response.data.map(({ confirmed, deaths, reportDate }) => ({ 
			reportDate, 
			confirmed: confirmed.total, 
			death: deaths.total
		}))

	} catch(e) {
		console.log(e) 
		throw new Error(e)
	}
}



export const useCountryData = (country) => {
	const [ data, updateData ] = useState({
									confirmed: {}, 
									recovered: {},
									deaths: {} 
								 })  
	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchData(country) 
			console.log(data)
			updateData(data) 			
		}
		fetchAPI() 
	}, [ country ])

	return data 
}

export const useDailyData = () => {
	const [ data, updateData ] = useState([])  
	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchDailyData() 
			console.log(data)
			updateData(data) 			
		}
		fetchAPI() 
	}, [])

	return data 
}
