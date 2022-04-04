import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_MSG } from "../graphql/queries";
import { SEND_MSG } from "../graphql/mutations";
import MessageCard from "./MessageCard";
import SendIcon from "@mui/icons-material/Send";
import { MSG_SUB } from "../graphql/subscription";

const ChatScreen = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessage] = useMutation(SEND_MSG, {
    onCompleted(data) {
      setMessages(prevState => [...prevState, data.createMessage]);
    },
  });

  const { data: subData } = useSubscription(MSG_SUB, {
    onSubscriptionData({
      subscriptionData: {
        data: { messageAdded },
      },
    }) {
      console.log(messageAdded);
      setMessages(prevState => [...prevState, messageAdded]);
    },
  });

  const { id, name } = useParams();
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" color="#444">
            {" "}
            {name}{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box backgroundColor="#f5f5f5" height="80vh" padding={2} sx={{ overflowY: "auto" }}>
        {loading ? (
          <Typography variant="h6"> Loading chats </Typography>
        ) : (
          messages.map(({ text, date, receiverId, createdAt }) => (
            <MessageCard
              key={Math.random() * 1000000000000000000000000000000}
              text={text}
              date={createdAt}
              direction={receiverId === +id ? "end" : "start"}
            />
          ))
        )}
      </Box>
      <Stack flexDirection="row" display="flex" alignItems="center">
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={3}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            sendMessage({
              variables: {
                receiverId: +id,
                text,
              },
            });
          }}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
