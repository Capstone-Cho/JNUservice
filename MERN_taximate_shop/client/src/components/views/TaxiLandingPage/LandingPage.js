/* global kakao */
import React, {useEffect, useState} from 'react'
import {FaCode} from 'react-icons/fa'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import TaxiBar from '../TaxiBar/NavBar'
import axios from 'axios'
import moment from 'moment'
const {Title} = Typography
const {Meta} = Card

function LandingPage() {
    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos').then(response => {
            if (response.data.success) {
                console.log(response.data.videos)
                setVideos(response.data.videos)
            } else {
                alert('Failed to get Videos')
            }
        })
    }, [])

    const renderCards = Videos.map((video, index) => {
        // var minutes = Math.floor(video.duration / 60)
        // var seconds = Math.floor(video.duration - minutes * 60)

        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <div style={{margin: '5px', padding: '10px', border: '3px solid #FFC000', borderRadius: '20px'}}>
                    <div style={{position: 'relative'}}>
                        <a href={`/video/${video._id}`}>
                            <img
                                src={`https://upload.wikimedia.org/wikipedia/commons/3/3f/Taxi_Icon.png`}
                                style={{width: '100px', margin: '30px'}}
                            />
                            {/* <div
                                className=" duration"
                                style={{
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    margin: '4px',
                                    color: '#fff',
                                    backgroundColor: 'rgba(17, 17, 17, 0.8)',
                                    opacity: 0.8,
                                    padding: '2px 4px',
                                    borderRadius: '2px',
                                    letterSpacing: '0.5px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    lineHeight: '12px',
                                }}
                            >
                                <span>
                                    {minutes} : {seconds}
                                </span>
                            </div> */}

                            {/* <img style={{width: '100%'}} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} /> */}
                        </a>
                        <div>
                            {video.StartLocation} &#62; {video.EndLocation}
                        </div>
                    </div>
                    <Meta avatar={<Avatar src={video.writer.image} />} title={video.writer.name} />
                    <span style={{marginLeft: '3rem'}}> {video.views}</span>- <span> {moment(video.createdAt).format('MMM Do YY')} </span>
                </div>
            </Col>
        )
    })

    return (
        <>
            <TaxiBar />
            <div style={{width: '85%', margin: '3rem auto', display: 'flex', flexDirection: 'column'}}>
                <Title level={2}> Taxi Mate </Title>
                <Row>{renderCards}</Row>
            </div>
        </>
    )
}

export default LandingPage
