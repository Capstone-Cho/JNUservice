/* global kakao */
import React, {useState, useEffect} from 'react'
import {Typography, Form, message, Icon} from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import {useSelector} from 'react-redux'

import TaxiBar from '../TaxiBar/NavBar'

import styled from 'styled-components'

const {Title} = Typography

const Input = styled.input`
    width: 85%;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    overflow: visible;
    box-sizing: border-box;
    &:hover {
        border: 1px solid #fcbf49;
    }
    &:focus {
        border: none;
        outline: 1px solid #fcbf49;
        box-shadow: 0px 0px 10px #fcbf49;
    }
`

const Textarea = styled.textarea`
    width: 100%;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
        border: 1px solid #fcbf49;
    }
    &:focus {
        border: none;
        outline: 1px solid #fcbf49;
        box-shadow: 0px 0px 10px #fcbf49;
    }
`

const Button = styled.button`
    color: #fff;
    background-color: #f7b801;
    height: 40px;
    font-weight: 400;
    padding: 0 15px;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    outline: none;
    border: none;
    &:hover {
        background-color: #fcbf49;
    }
`

function UploadVideoPage(props) {
    const user = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState('Film & Animation')
    const [FilePath, setFilePath] = useState('')
    const [Duration, setDuration] = useState('')
    const [Thumbnail, setThumbnail] = useState('')

    const [StartLa, setStartLa] = useState(0)
    const [StartMa, setStartMa] = useState(0)
    const [EndLa, setEndLa] = useState(0)
    const [EndMa, setEndMa] = useState(0)

    const [StartLocation, setStartLocation] = useState('')
    const [EndLocation, setEndLocation] = useState('')
    const [MeetTime, setMeetTime] = useState('')

    const [EndAddr, setEndAddr] = useState('')
    const [StartAddr, setStartAddr] = useState('')

    const handleChangeTitle = event => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = event => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeTime = event => {
        setMeetTime(event.currentTarget.value)
    }

    const handleChangeStartLocation = e => {
        setStartLocation(e.currentTarget.value)
    }

    const handleChangeEndLocation = e => {
        setEndLocation(e.currentTarget.value)
    }

    const onSubmit = event => {
        event.preventDefault()

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (StartLocation === '' || EndLocation === '' || MeetTime === '') {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: Description,
            StartLa: StartLa,
            StartMa: StartMa,
            EndLa: EndLa,
            EndMa: EndMa,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail,
            StartLocation: StartLocation,
            EndLocation: EndLocation,
            MeetTime: MeetTime,
        }

        axios.post('/api/video/uploadVideo', variables).then(response => {
            if (response.data.success) {
                alert('video Uploaded Successfully')
                props.history.push('/taxi')
            } else {
                alert('Failed to upload video')
            }
        })
    }

    useEffect(() => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.45617, 126.56201),
                level: 5, // 지도의 확대 레벨
            }

        var map = new kakao.maps.Map(mapContainer, mapOption) // 지도를 생성합니다

        /* 주소를 받아오기 기능 미사용 ============================================================================== */

        var geocoder = new kakao.maps.services.Geocoder()

        var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
            infowindow = new kakao.maps.InfoWindow({zindex: 1}) // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        searchAddrFromCoords(map.getCenter(), displayCenterInfo)

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', function () {
            searchAddrFromCoords(map.getCenter(), displayCenterInfo)
        })

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
        }

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // var infoDiv = document.getElementById('centerAddr')

                for (var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        return result[i].address_name
                    }
                }
            }
        }

        /* ============================================================================== */

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
        var startPosition = new kakao.maps.LatLng(33.45617, 126.56201)

        // 출발 마커를 생성합니다
        var startMarker = new kakao.maps.Marker({
            map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
            position: startPosition,
            draggable: true, // 출발 마커가 드래그 가능하도록 설정합니다
            image: startImage, // 출발 마커이미지를 설정합니다
        })

        // 출발 마커에 dragstart 이벤트를 등록합니다
        kakao.maps.event.addListener(startMarker, 'dragstart', function () {
            // 출발 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
            startMarker.setImage(startDragImage)
        })

        // 출발 마커에 dragend 이벤트를 등록합니다
        kakao.maps.event.addListener(startMarker, 'dragend', function () {
            // 출발 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
            const spo = startMarker.getPosition()
            setStartLa(spo.La)
            setStartMa(spo.Ma)
            startMarker.setImage(startImage)

            searchDetailAddrFromCoords(spo, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : ''
                    detailAddr = '<div>지번 주소 : ' + result[0].address.address_name + '</div>'

                    var ShowAddr = !!result[0].road_address ? result[0].road_address.address_name : ''
                    ShowAddr += result[0].address.address_name

                    var content = '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>' + detailAddr + '</div>'

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    // infowindow.setContent(content)
                    // infowindow.open(map, startMarker)
                    setStartAddr(ShowAddr)
                }
            })
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
        var arrivePosition = new kakao.maps.LatLng(33.4561, 126.56276)

        // 도착 마커를 생성합니다
        var arriveMarker = new kakao.maps.Marker({
            map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
            position: arrivePosition,
            draggable: true, // 도착 마커가 드래그 가능하도록 설정합니다
            image: arriveImage, // 도착 마커이미지를 설정합니다
        })

        // 도착 마커에 dragstart 이벤트를 등록합니다
        kakao.maps.event.addListener(arriveMarker, 'dragstart', function () {
            // 도착 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
            arriveMarker.setImage(arriveDragImage)
        })

        // 도착 마커에 dragend 이벤트를 등록합니다
        kakao.maps.event.addListener(arriveMarker, 'dragend', function () {
            // 도착 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
            const epo = arriveMarker.getPosition()
            setEndLa(epo.La)
            setEndMa(epo.Ma)
            arriveMarker.setImage(arriveImage)

            searchDetailAddrFromCoords(epo, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : ''
                    detailAddr = '<div>지번 주소 : ' + result[0].address.address_name + '</div>'

                    var ShowAddr = !!result[0].road_address ? result[0].road_address.address_name : ''
                    ShowAddr += result[0].address.address_name

                    var content = '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>' + detailAddr + '</div>'

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    // infowindow.setContent(content)
                    // infowindow.open(map, arriveMarker)
                    setEndAddr(ShowAddr)
                }
            })
        })
        /* ============================================================================== */
    }, [])

    return (
        <>
            <TaxiBar />
            <div style={{maxWidth: '1000px', margin: '2rem auto'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <Title level={2}> Upload</Title>
                </div>

                <Form onSubmit={onSubmit} style={{display: 'flex'}}>
                    <div id="map" style={{width: '50%', height: '500px', boxShadow: '0px 0px 5px 1px #fcbf49'}}></div>

                    <div style={{width: '50%', marginLeft: '15px'}}>
                        <label>출발 장소</label>
                        <Textarea value={StartAddr} style={{maxWidth: '100%'}} />
                        <br />
                        <label htmlFor="">상세주소 </label>
                        <Input type="text" value={StartLocation} onChange={handleChangeStartLocation} />
                        <br />
                        <br />
                        <label>도착 장소</label>
                        <Textarea value={EndAddr} style={{maxWidth: '100%'}} />
                        <br />
                        <label htmlFor="">상세주소 </label>
                        <Input type="text" value={EndLocation} onChange={handleChangeEndLocation} />
                        <br />
                        <br />
                        <label>시간</label>
                        <Input type="datetime-local" value={MeetTime} onChange={handleChangeTime} />
                        <br />
                        <br />
                        <label>내용</label>
                        <Textarea onChange={handleChangeDecsription} value={Description} />
                        <br />
                        <br />
                        <label>출발</label>
                        <Input value={StartLa} style={{width: '40%', marginLeft: '10px'}} />
                        <Input value={StartMa} style={{width: '40%', marginLeft: '10px'}} />
                        <br />
                        <br />
                        <label>도착</label>
                        <Input value={EndLa} style={{width: '40%', marginLeft: '10px'}} />
                        <Input value={EndMa} style={{width: '40%', marginLeft: '10px'}} />
                        <br />
                        <br />
                        <Button type="primary" size="large" onClick={onSubmit} style={{display: 'block', margin: 'auto'}}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default UploadVideoPage
