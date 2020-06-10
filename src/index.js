import React from 'react' 
import ReactDOM from 'react-dom' 
import { useState, useEffect } from 'react' 
import { Card, Chart } from './components' 
import { 
	Pane, 
	Button, 
	Strong, 
	SelectMenu, 
	Position,
	Switch } from 'evergreen-ui'
import { fetchCountries } from './api' 

console.log = () => {}

function Selector({ setGlobal, countries, setCountries, country, setCountry }) {

	useEffect(() => {
		const fetchAPI = async () => {
			const countries = await fetchCountries() 
			console.log(countries) 
			setCountries(countries)
		}
		fetchAPI() 
	}, [ setCountries ])

	return (
		<SelectMenu
		  position={Position.TOP}
		  title="Select Country"
		  options={countries}
		  selected={country}
		  onSelect={({ value }) => {
		  		setCountry(value)
		  		setGlobal(false) 
		  }}
		>
		  <Button>{country || 'Select Country...'}</Button>
		</SelectMenu>
	)
}


function App() {
	const [ global, setGlobal ] = useState(true) 
	const [ country, setCountry ] = useState('') 
	const [ countries, setCountries ] = useState([])

	return (
		<Pane clearfix
			alignItems='center'
			display='flex'
			justifyContent='center'
			flexDirection="column"
		>
			<img src="/images/corona.jpg" alt="corona virus" height="300" width="auto"/>
			<Card global={global} country={country}/>
			<Strong> 
				GLOBAL
		    	<Switch
      				checked={global}
      				height={24}
    	  			onChange={e => {
    	  				setGlobal(true)
    	  				setCountry('')
    	  			}}
      				marginBottom={24}
				/>
			</Strong>
			<Selector 
				countries={countries}
				setCountries={setCountries} 
				country={country}
				setGlobal={setGlobal}
				setCountry={setCountry}
			/>
			<Chart
				country={country}
				global={global}
			/>
		</Pane> 
	)
}

ReactDOM.render(<App/>, document.getElementById("root"))
