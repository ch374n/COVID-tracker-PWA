import React from 'react'
import { Pane, Text , Spinner } from 'evergreen-ui' 
import styles from './Card.module.css' 
import { useCountryData } from '../../api' 
import CountUp from 'react-countup' 

export default function Card({ global, country }) {
	const data = useCountryData(country)


	if(!data.confirmed.value) {
		return (
			<Pane display="flex" alignItems="center" justifyContent="center" height={400}>
			  <Spinner />
			</Pane>		
		)
	}

	const {
		confirmed: {
			value: confirmed
		}, 
		deaths: {
			value: deaths
		}, 
		recovered: {
			value: recovered
		}, 		
	} = data 

	return (
		<Pane clearfix
			alignItems='center'
			display='flex'
			justifyContent='center'
			fontSize={30}
		>
			<Pane
			  elevation={1}
			  float="left"
			  width={190}
			  height={120}
			  margin={24}
			  display="flex"
			  justifyContent="center"
			  alignItems="center"
			  flexDirection="column"
			  className={styles.confirmed}
			>
			<CountUp 
				start={0}
				end={confirmed}
				duration={2}
				separator={","}
			/>
			  <Text size={300}>Confirmed Cases</Text>
			</Pane>
			<Pane
			  elevation={1}
			  float="left"
			  width={190}
			  height={120}
			  margin={24}
			  display="flex"
			  justifyContent="center"
			  alignItems="center"
			  flexDirection="column"
			  className={styles.recovered}			  
			>
			<CountUp 
				start={0}
				end={recovered}
				duration={2}
				separator={","}
			/>
			  <Text size={300}>Recovered Cases</Text>
			</Pane>
			<Pane
			  elevation={1}
			  float="left"
			  width={190}
			  height={120}
			  margin={24}
			  display="flex"
			  justifyContent="center"
			  alignItems="center"
			  flexDirection="column"
			  className={styles.deaths}

			>
			<CountUp 
				start={0}
				end={deaths}
				duration={2}
				separator={","}
			/>
			  <Text size={300}>Death Cases</Text>
			</Pane>
		</Pane>
	)
}