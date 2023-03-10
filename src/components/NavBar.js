import { AccountCircle } from "@mui/icons-material";
import { Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

function NavBar() {
  return (
    <Paper variant="outlined">
      <Container style={{ background: "black", color: "white" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid justifyContent={"center"} textAlign={"center"}>
            <Typography variant="h4">Admin Dashboard</Typography>
          </Grid>
          <AccountCircle fontSize="large" />
        </Toolbar>
      </Container>
    </Paper>
  );
}

export default NavBar;
