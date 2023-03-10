import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

function MemberTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell variant="head">
          <Typography variant="h5">Name</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h5">Email</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h5">Role</Typography>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Typography variant="h5">Action</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default MemberTableHead;
