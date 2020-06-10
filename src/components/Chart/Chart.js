import React from 'react';
import { useCountryData, useDailyData } from '../../api'
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

const getBarData = ({ confirmed, recovered, deaths }) => {
  return ({
	  labels: [ 'Confirmed', 'Recovered', 'Deaths'], 
	  datasets: [
	    {

	      label: 'People',
	      backgroundColor: [
	      'rgba(0, 0, 255,.5)',
	      'rgba(0, 255, 0,.5)',
	      'rgba(255, 0, 0,.5)',
	      ],
	      borderWidth: 1,
	      data: [confirmed.value, recovered.value, deaths.value]
	    },
	  ]  	
  })
};


const getLineData = (data = []) => {
  
  return ({
	  labels: data.map(d => d.reportDate),
	  datasets: [
	    {
	      label: 'Confirmed',
	      fill: true,
	      borderColor: 'blue', 
	      backgroundColor: 'rgba(0, 0, 255, 0.4)',
	      data: data.map(d => d.confirmed)
	    }, 
	    {
	      label: 'Deaths',
	      fill: true,
	      backgroundColor: 'rgba(255, 0, 0, 0.4)',
	      borderColor: 'red', 
	      data: data.map(d => d.death)
	    }, 
	  ]
  })
};


export default function Chart({ global, country }) {
  const lineData = getLineData(useDailyData())
  const barData = getBarData(useCountryData(country))
  
  if(global) {
	  return(
	  	<div>
	        <Line 
	        	data={lineData} 
	            width={701}
          		height={500}
	        />
      	</div>
      )
  }


  return (
      <div>
        <Bar
          data={barData}
          width={701}
          height={500}
          options={{
          	legend: false, 
            title: { display: true, text: `Current State In ${country}`}
          }}
        />
      </div>
    )
}











// import React from 'react';
