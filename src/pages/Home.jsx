import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { Backend } from "../utils/backend";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 765px) {
    justify-content: center;
    align-items: center;
  }
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${Backend}videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
