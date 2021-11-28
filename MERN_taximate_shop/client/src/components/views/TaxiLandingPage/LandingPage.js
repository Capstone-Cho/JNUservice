/* global kakao */
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import TaxiBar from "../TaxiBar/NavBar";
import axios from "axios";
import moment from "moment";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } else {
        alert("작성에 실패했습니다.");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div
          style={{
            margin: "20px",
            padding: "10px",
            border: "3px solid #FFC000",
            borderRadius: "20px",
          }}
        >
          <div style={{ position: "relative" }}>
            <a href={`/video/${video._id}`}>
              <img
                src={`https://upload.wikimedia.org/wikipedia/commons/3/3f/Taxi_Icon.png`}
                style={{
                  width: "100px",
                  margin: "auto",
                  display: "block",
                }}
              />
              {/* <img style={{width: '100%'}} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} /> */}
            </a>
            <div style={{ textAlign: "center", margin: "10px 0 10px" }}>
              {video.StartLocation} &#62; {video.EndLocation}
            </div>
          </div>
          <Meta
            avatar={<Avatar src={video.writer.image} />}
            title={video.writer.name}
          />
          <span style={{ textAlign: "center", margin: "auto" }}>
            {" "}
            {moment(video.MeetTime).format("YYYY년 MM월 D일 hh:mm 예정")}
          </span>
        </div>
      </Col>
    );
  });

  return (
    <>
      <TaxiBar />
      <div
        style={{
          width: "85%",
          margin: "3rem auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title level={2}> Taxi Mate </Title>
        <Row>{renderCards}</Row>
      </div>
    </>
  );
}

export default LandingPage;
