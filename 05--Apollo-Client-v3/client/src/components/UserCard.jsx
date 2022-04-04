import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ firstName, lastName, id }) => {
  const navigate = useNavigate();
  return (
    <Stack
      className="userCard"
      direction="row"
      spacing={1.5}
      sx={{ py: 1 }}
      display="flex"
      alignItems="center"
      onClick={() => navigate(`/${id}/${firstName} ${lastName}`)}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`}
        sx={{ width: 32, height: 32 }}
      />
      <Typography variant="subtitle2">
        {" "}
        {firstName} {lastName}{" "}
      </Typography>
    </Stack>
  );
};

export default UserCard;
