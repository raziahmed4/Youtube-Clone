import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../Data'
import moment from 'moment'
import { value_convertor } from '../../Data'
import { useParams } from 'react-router-dom'

const Playvideo = () => {

    const {videoId}= useParams();

    const [apiData,setApiData]= useState(null);
    const [channelData,setchannelData]=useState(null);
    const [commentData,setcommentData]=useState([]);

    const fetchVideoData=async ()=>{
        //fetching video data
       
        const videoDetails_Url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;
   
         await fetch(videoDetails_Url).then(response=>response.json()).then(data=>setApiData(data.items[0]));
    }

    const fetchOtherData =async ()=>{
        //fetching channel data
        const channeData_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channeData_url).then(response=>response.json()).then(data=>setchannelData(data.items[0]));
    
         //fetching comment data

         const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY} `
         await fetch(comment_url).then(response=>response.json()).then(data=>setcommentData(data.items));
    
    }

    useEffect(()=>{
        fetchVideoData();
    },[videoId]);
    useEffect(()=>{
        fetchOtherData();
    },[apiData]);

  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
         <div className='play-video-info'>
             <p>{apiData?apiData.statistics.viewCount:"16k"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"3 days ago"}</p>
             <div>
                  <span><img src={like} alt=''/>{value_convertor(apiData?apiData.statistics.likeCount:"16k")}</span> 
                  <span><img src={dislike} alt=''/></span> 
                  <span><img src={share} alt=''/>Share</span> 
                  <span><img src={save} alt=''/>22</span> 
             </div>
             
        </div>
        <hr/>

       


           <div className='publisher'>
                  <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt=''/>
                  <div>
                      <p>{apiData?apiData.snippet.channelTitle:""}</p>
                      <span>{value_convertor(channelData?channelData.statistics.subscriberCount:"3M")}</span>

                  </div>
                  <button>Subscribe</button>

            </div>  

         
            
             

             <div className="video-description">
                <p>{apiData?apiData.snippet.description:"Description Here"}</p>
                 <hr/>
                 <h4>{value_convertor(apiData?apiData.statistics.commentCount:"1600")} Comments</h4>



                   {commentData.map((item,index)=>{
                    return (
                        <div key={index} className='comment'>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''/>
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                            <p> {item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className='comment-action'>
                                <img src={like} alt=''/>
                                <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt=''/>
                            </div>
                        </div>
                     </div>

                    )
                   })}

                

                 

                 
            </div>
               
                 
             


       

         </div>
   
  )
}

export default Playvideo