import { Box, Typography, Divider, Stack } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";

const Sidebar = ({ setIsLoggedIn }) => {
  const { loading, data, error, refetch } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <Typography variant="h6">Loading Chats</Typography>;
  }

  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width={250} padding={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }}
        />
      </Stack>
      <Divider />
      {data.users.map(item => (
        <UserCard {...item} key={item.id} />
      ))}
    </Box>
  );
};

export default Sidebar;
