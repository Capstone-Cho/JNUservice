/* global kakao */
import React, {useEffect, useState} from 'react'
import {List, Row, Col} from 'antd'
import axios from 'axios'
import SideBar from './Sections/SideBar'
import Subscriber from './Sections/Subscriber'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes'
import TaxiBar from '../TaxiBar/NavBar'
import moment from 'moment'
import styled from 'styled-components'

const ScrollBar = styled.div`
    height: 500px;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(255, 192, 0);
        border-radius: 20px;
    }
`

function DetailVideoPage(props) {
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId,
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable).then(response => {
            if (response.data.success) {
                const pos = response.data.video
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div태그
                    mapOption = {
                        center: new kakao.maps.LatLng(pos.StartMa, pos.StartLa),
                        level: 5, // 지도의 확대 레벨
                    }

                var map = new kakao.maps.Map(mapContainer, mapOption) // 지도를 생성합니다

                var startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', // 출발 마커이미지의 주소입니다
                    startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
                    startOption = {
                        offset: new kakao.maps.Point(15, 43), // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
                    }

                // 출발 마커 이미지를 생성합니다
                var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption)

                var startDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png', // 출발 마커의 드래그 이미지 주소입니다
                    startDragSize = new kakao.maps.Size(50, 64), // 출발 마커의 드래그 이미지 크기입니다
                    startDragOption = {
                        offset: new kakao.maps.Point(15, 54), // 출발 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
                    }

                // 출발 마커의 드래그 이미지를 생성합니다
                var startDragImage = new kakao.maps.MarkerImage(startDragSrc, startDragSize, startDragOption)

                // 출발 마커가 표시될 위치입니다
                var startPosition = new kakao.maps.LatLng(pos.StartMa, pos.StartLa)
                // var startPosition = new kakao.maps.LatLng(Video.StartLa, Video.StartMa)

                // 출발 마커를 생성합니다
                var startMarker = new kakao.maps.Marker({
                    map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
                    position: startPosition,
                    draggable: false, // 출발 마커가 드래그 가능하도록 설정합니다
                    image: startImage, // 출발 마커이미지를 설정합니다
                })

                var arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png', // 도착 마커이미지 주소입니다
                    arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
                    arriveOption = {
                        offset: new kakao.maps.Point(15, 43), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
                    }

                // 도착 마커 이미지를 생성합니다
                var arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption)

                var arriveDragSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png', // 도착 마커의 드래그 이미지 주소입니다
                    arriveDragSize = new kakao.maps.Size(50, 64), // 도착 마커의 드래그 이미지 크기입니다
                    arriveDragOption = {
                        offset: new kakao.maps.Point(15, 54), // 도착 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
                    }

                // 도착 마커의 드래그 이미지를 생성합니다
                var arriveDragImage = new kakao.maps.MarkerImage(arriveDragSrc, arriveDragSize, arriveDragOption)

                // 도착 마커가 표시될 위치입니다
                var arrivePosition = new kakao.maps.LatLng(pos.EndMa, pos.EndLa)
                console.log(pos)

                // 도착 마커를 생성합니다
                var arriveMarker = new kakao.maps.Marker({
                    map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
                    position: arrivePosition,
                    draggable: false, // 도착 마커가 드래그 가능하도록 설정합니다
                    image: arriveImage, // 도착 마커이미지를 설정합니다
                })

                setVideo(response.data.video)
            } else {
                alert('Failed to get video Info')
            }
        })

        axios.post('/api/comment/getComments', videoVariable).then(response => {
            if (response.data.success) {
                // console.log('response.data.comments', response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [])

    const updateComment = newComment => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if (Video.writer) {
        return (
            <>
                <TaxiBar />
                <div
                    id="map"
                    style={{width: '1000px', height: '400px', marginLeft: '100px', border: '10px solid #ffc000', borderRadius: '20px'}}
                ></div>
                <div style={{display: 'grid', gridTemplateColumns: '3fr 1fr'}}>
                    <div>
                        <div className="postPage" style={{width: '100%', padding: '3rem 4em'}}>
                            <div>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '30px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {Video.StartLocation} -&#62; {Video.EndLocation}
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{display: 'flex'}}>
                                        <div>
                                            <img
                                                src={Video.writer && Video.writer.image}
                                                alt=""
                                                width="50px"
                                                style={{borderRadius: '50%', marginRight: '15px'}}
                                            />
                                        </div>

                                        <ul style={{listStyle: 'none'}}>
                                            <li>{moment(Video.MeetTime).format('YYYY년 MM월 D일 hh:mm 예정')}</li>
                                            <li>{Video.description}</li>
                                        </ul>
                                    </div>

                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />
                                        <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />
                                    </div>
                                </div>
                            </div>

                            <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
                        </div>
                    </div>
                    <ScrollBar style={{height: '500px', overflow: 'scroll'}}>
                        <SideBar />
                    </ScrollBar>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div>Loading...</div>
                <div id="map" style={{width: '950px', height: '400px', marginLeft: '80px'}}></div>
            </>
        )
    }
}

export default DetailVideoPage
