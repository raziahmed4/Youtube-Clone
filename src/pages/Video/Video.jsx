import React from 'react'
import './Video.css'
import Playvideo from '../../Component/Playvideo/Playvideo'
import Recomended from '../../Component/Recommended/Recomended'
import { useParams, useSearchParams } from 'react-router-dom'

const Video = () => {
const {videoId,categoryID}= useParams();
  
  return (
    <div className='play-container'>
        <Playvideo videoId={videoId} />
        <Recomended categoryID={categoryID}/>

    </div>
  )
}

export default Video