import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MessageCard = ({ text, date, direction }) => {
  return (
    <Box display="flex" justifyContent={direction}>
      <Box textAlign="right">
        <Typography backgroundColor="white" padding={0.8} variant="subtitle2">
          {text}
        </Typography>
        <Typography variant="caption" textAlign="right">
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageCard;
