import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";
import TaxiBar from "../TaxiBar/NavBar";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Videos, setVideos] = useState([]);

  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    axios
      .post("/api/video/getSubscriptionVideos", variable)
      .then((response) => {
        if (response.data.success) {
          setVideos(response.data.videos);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  }, []);

  const renderCards = Videos.map((video, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }} key={index}>
          <a href={`/video/${video._id}`}>
            {/* <img style={{width: '100%'}} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} /> */}
            <img
              src={`https://img.icons8.com/fluency/2x/carpool.png`}
              style={{
                width: "150px",
                margin: "auto",
                justifyContent: "center",
                display: "block",
              }}
            />
          </a>
          <div style={{ textAlign: "center", margin: "auto" }}>
            {video.StartLocation} &#62; {video.EndLocation}
          </div>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.writer.name}
        />
        <span style={{ textAlign: "center", margin: "auto" }}>
          {" "}
          {moment(video.MeetTime).format("YYYY년 MM월 D일 hh:mm 예정")}
        </span>
      </Col>
    );
  });

  return (
    <>
      <TaxiBar />
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2}> 택시 메이트들의 일정 </Title>
        <hr />

        <Row gutter={16}>{renderCards}</Row>
      </div>
    </>
  );
}

export default SubscriptionPage;
