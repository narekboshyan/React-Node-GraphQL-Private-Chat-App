import { Box, Typography, Divider, Stack } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const users = [
    {
      id: 1,
      firstName: "Emily",
      lastName: "Blunt",
    },
    {
      id: 2,
      firstName: "Megan",
      lastName: "Fox",
    },
    {
      id: 3,
      firstName: "Jenifer",
      lastName: "Aniston",
    },
  ];
  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width={250} padding={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon />
      </Stack>
      <Divider />
      {users.map((item) => (
        <UserCard {...item} key={item.id} />
      ))}
    </Box>
  );
};

export default Sidebar;
