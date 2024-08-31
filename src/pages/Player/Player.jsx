import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Player.css'

import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGY2YmNkYzQ3MGYwZTNiOWI1ZDEyZjUxN2Q4ZjMxOCIsIm5iZiI6MTcyNTE0Mjk1MS41MjY2NDksInN1YiI6IjY1NTVhN2U4ZWE4NGM3MTA5NmRkNTc1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ymSVooQS7o11JLJL_5cGACDLCHr-rYpqhJjat23r8NU'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}} />
      <iframe width='90%' height='90%' src={`https://youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player