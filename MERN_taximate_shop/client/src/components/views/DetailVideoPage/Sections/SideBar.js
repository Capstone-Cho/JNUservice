import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'

function SideBar() {
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
        return (
            <div key={index} style={{display: 'flex', marginTop: '1rem', padding: '0 2rem'}}>
                <div style={{width: '40%', marginRight: '1rem'}}>
                    <a href={`/video/${video._id}`} style={{color: 'gray'}}>
                        <img
                            src={`https://upload.wikimedia.org/wikipedia/commons/3/3f/Taxi_Icon.png`}
                            style={{width: '30px', margin: '30px'}}
                        />
                    </a>
                </div>

                <div style={{width: '50%'}}>
                    <a href={`/video/${video._id}`} style={{color: 'gray'}}>
                        <span style={{fontSize: '1rem', color: 'black'}}>
                            {video.StartLocation} &#62; {video.EndLocation}
                        </span>
                        <br />
                        <span>
                            {moment(video.MeetTime).format('YYYY년 MM월 D일')}
                            <br></br>
                            {moment(video.MeetTime).format('hh:mm 예정')}
                        </span>
                        <br />
                        <br />
                    </a>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div style={{marginTop: '3rem'}}></div>
            {sideVideoItem}
        </div>
    )
}

export default SideBar
