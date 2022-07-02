import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Clear from '../assests/clear.jpg'
import Snow from '../assests/snow.jpg'
import Rainy from '../assests/rainy.png'
import Cloudy from '../assests/cloudyjpg.jpg'
import Overcast from '../assests/overcast.png'
import '../components/Weather.css'


const Weather = () => {
    const [place,setPlace]=useState('india')
    const [placeInfo,setPlaceInfo]= useState({})
    const [error,setError]=useState('')
    const handleSubmit=()=>{
      axios.get(`http://api.weatherapi.com/v1/current.json?key=c8d572e81e6c4c8d9c334852220207&q=${place}&aqi=no`)
      .then(response=>{
        console.log(response.data)
        setPlaceInfo({
            name:response.data.location.name,
            country:response.data.location.country,
            temp:response.data.current.temp_c,
            condition:response.data.current.condition.text,
            time:response.data.location.localtime,
            img: response.data.current.condition.icon
        })
      })
      .catch(err=>{
        setError('Somthing Went Wroung!')
      })
    }

    useEffect(()=>{
        handleSubmit()
    },[place])
   
  return (
    <div className='weather_maincontainer' style={placeInfo.condition?.toLowerCase()==="clear" ||
    placeInfo.condition?.toLowerCase()==="sunny"
    ? {backgroundImage:`url(${Clear})`}
     :placeInfo.condition?.includes("cloudy")
     ?{backgroundImage:`url(${Cloudy})`}
     :placeInfo.condition?.toLowerCase().includes("rainy")
     ?{backgroundImage:`url(${Rainy})`}
    :placeInfo.condition?.toLowerCase().includes("snow")
     ?{backgroundImage:`url(${Snow})`}
    :{backgroundImage:`url(${Overcast})`}}>
    <div className='search_input'> 
    <input type='text' value={place} onChange={(e)=>setPlace(e.target.value)}/>
    <button className='btn' onClick={handleSubmit}>Submit</button>
    </div>
    <div className='weather_container'>
        <div className='top_part'>
        <h3>{placeInfo.temp} &deg;C</h3>
        <h2> {placeInfo.name},{placeInfo.country},{placeInfo.time}</h2>
            <div className='condition'>
            <h1>{placeInfo.condition}</h1> 
            </div>
            </div>
            
    </div>
    </div>
  )
}

export default Weather