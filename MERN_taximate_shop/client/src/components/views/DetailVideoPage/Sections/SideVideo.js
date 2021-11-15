import React, {useEffect, useState} from 'react'
import axios from 'axios'
function SideVideo() {
    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos').then(response => {
            if (response.data.success) {
                // console.log(response.data.videos)
                setSideVideos(response.data.videos)
            } else {
                alert('Failed to get Videos')
            }
        })
    }, [])

    const sideVideoItem = SideVideos.map((video, index) => {
        var minutes = Math.floor(video.duration / 60)
        var seconds = Math.floor(video.duration - minutes * 60)

        return (
            <div key={index} style={{display: 'flex', marginTop: '1rem', padding: '0 2rem'}}>
                <div style={{width: '40%', marginRight: '1rem'}}>
                    <a href={`/video/${video._id}`} style={{color: 'gray'}}>
                        <img src={`https://img.icons8.com/fluency/2x/carpool.png`} style={{width: '30px', margin: '30px'}} />
                    </a>
                </div>

                <div style={{width: '50%'}}>
                    <a href={`/video/${video._id}`} style={{color: 'gray'}}>
                        <span style={{fontSize: '1rem', color: 'black'}}>{video.title} </span>
                        <br />
                        <span>이름: {video.writer.name}</span>
                        <br />
                        <span>조회: {video.views}</span>
                        <br />
                        <span>
                            {minutes} : {seconds}
                        </span>
                        <br />
                    </a>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            <div style={{marginTop: '3rem'}}></div>
            {sideVideoItem}
        </React.Fragment>
    )
}

export default SideVideo