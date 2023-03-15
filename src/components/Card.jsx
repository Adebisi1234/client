import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import TimeAgo from "timeago-react";

const Max = styled.div`
  position: relative;
`;

const pulse = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const Skeleton = styled.div`
  height: 100%;
  width: 100%;
  background-color: #828181;
  animation: ${pulse} 2s infinite;
`;

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "330px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const A = styled.a`
  color: white;
  position: absolute;
  cursor: pointer;
  bottom: 10px;
  right: ${(props) => (props.type === "sm" ? "1px" : "10px")};
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  width: 100%;
`;

const Temp = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `https://handsome-pink-hippo.cyclic.app/api/users/find/${video.userId}`
      );
      if (res.data === null) {
        console.log("Null");
      } else {
        setChannel(await res.data);
      }
      setLoading(false);
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Max>
      <>
        {Loading && (
          <>
            <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
              <Container type={type}>
                <Skeleton></Skeleton>
                <Details type={type}>
                  <Skeleton></Skeleton>
                  <Texts>
                    <Title>
                      <Skeleton></Skeleton>
                    </Title>

                    <ChannelName>
                      <Skeleton></Skeleton>
                    </ChannelName>
                    <Info>
                      <Skeleton></Skeleton>
                    </Info>
                  </Texts>
                </Details>
              </Container>
            </Link>
            <A>
              <Skeleton></Skeleton>
            </A>
          </>
        )}
        {!Loading && (
          <>
            <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
              <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                  <ChannelImage type={type} src={channel.img} />
                  <Texts>
                    <Title>{video.title}</Title>

                    <ChannelName>{channel.name}</ChannelName>
                    <Info>
                      {video.views} views •{" "}
                      <TimeAgo datetime={video.createdAt} />
                    </Info>
                  </Texts>
                </Details>
              </Container>
            </Link>
            <A target="_blank" href={video.videoUrl} download={video.title}>
              <DownloadForOfflineOutlinedIcon />
            </A>
          </>
        )}
      </>
    </Max>
  );
};

export default Card;
