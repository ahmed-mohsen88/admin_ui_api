import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

function MemberTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <StyledCell>Name</StyledCell>
        <StyledCell>Email</StyledCell>
        <StyledCell>Role</StyledCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "10px", md: "20px" } }}
          >
            Action
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const StyledCell = (props) => {
  return (
    <TableCell variant="head">
      <Typography variant="h5" sx={{ fontSize: { xs: "10px", md: "20px" } }}>
        {props.children}
      </Typography>
    </TableCell>
  );
};

export default MemberTableHead;
