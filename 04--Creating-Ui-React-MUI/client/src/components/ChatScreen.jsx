import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import MessageCard from "./MessageCard";

const ChatScreen = () => {
  const { id, name } = useParams();

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
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding={2}
        sx={{ overflowY: "auto" }}
      >
        <MessageCard
          text="hi Emily it is pleasure to meet you"
          date="123"
          direction="start"
        />
        <MessageCard
          text="hi Emily it is pleasure to meet you"
          date="123"
          direction="end"
        />
        <MessageCard
          direction="start"
          text="hi Emily it is pleasure to meet you"
          date="123"
        />
      </Box>
      <TextField
        placeholder="Enter a message"
        variant="standard"
        fullWidth
        multiline
        rows={3}
      />
    </Box>
  );
};

export default ChatScreen;
