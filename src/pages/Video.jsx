import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { Backend } from "../utils/backend";
import TimeAgo from "timeago-react";

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  console.log(currentUser && currentUser);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${Backend}videos/find/${path}`);
        const channelRes = await axios.get(
          `${Backend}users/find/${videoRes.data.userId}`
        );
        console.log(videoRes.data.userId);
        if (channelRes.data === null) {
          console.log("Channel is null");
        } else {
          setChannel(await channelRes.data);
          setLoading(false);
        }
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (currentUser) {
      await axios.put(`${Backend}users/like/${currentVideo._id}`);
      dispatch(like(currentUser && currentUser._id));
    } else {
      alert("You are not authorized");
    }
  };
  const handleDislike = async () => {
    if (currentUser) {
      await axios.put(`${Backend}users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser && currentUser._id));
    } else {
      alert("You are not authorized");
    }
  };

  const handleSub = async () => {
    if (currentUser) {
      currentUser && currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`${Backend}users/unsub/${channel._id}`)
        : await axios.put(`${Backend}users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
    } else {
      alert("You are not authorized");
    }
  };

  //TODO: DELETE VIDEO FUNCTIONALITY

  return (
    <Container>
      {loading && <Temp>Loading...</Temp>}
      {!loading && (
        <>
          <Content>
            <VideoWrapper>
              <VideoFrame src={currentVideo.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} views •{" "}
                <TimeAgo datetime={currentVideo.createdAt} />
              </Info>
              <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo.likes?.includes(
                    currentUser && currentUser?._id
                  ) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}{" "}
                  {currentVideo.likes?.length}
                </Button>
                <Button onClick={handleDislike}>
                  {currentVideo.dislikes?.includes(
                    currentUser && currentUser?._id
                  ) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}{" "}
                  Dislike
                </Button>
                <Button>
                  <ReplyOutlinedIcon /> Share
                </Button>
                <Button>
                  <AddTaskOutlinedIcon /> Save
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img} />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <Description>{currentVideo.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>
              <Subscribe onClick={handleSub}>
                {currentUser &&
                currentUser.subscribedUsers?.includes(channel._id)
                  ? "SUBSCRIBED"
                  : "SUBSCRIBE"}
              </Subscribe>
            </Channel>
            <Hr />
            <Comments videoId={currentVideo._id} />
          </Content>
          <Recommendation tags={currentVideo.tags} />
        </>
      )}
    </Container>
  );
};
export default Video;
