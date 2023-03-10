import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import React from "react";

function AddMemberModal({
  handelInput,
  handelAddsubmit,
  setOpenADD,
  openADD,
  sethandelInput
}) {

  const handelModalChange = (e, value) => {
    const newInput = { ...handelInput };
    newInput[value] = e.target.value;
    sethandelInput(newInput);
  };

  return (
    <Modal open={openADD} onClose={() => setOpenADD(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Container
          sx={{
            padding: "20px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid>
            <InputLabel>Name</InputLabel>
            <Input
              type="text"
              sx={{ width: "100%" }}
              value={handelInput.name}
              onChange={(e, name) => handelModalChange(e, "name")}
            />
          </Grid>
          <Grid>
            <InputLabel>Email</InputLabel>
            <Input
              type="text"
              sx={{ width: "100%" }}
              value={handelInput.email}
              onChange={(e, email) => handelModalChange(e, "email")}
            />
          </Grid>
          <Grid>
            <InputLabel>role</InputLabel>
            <Select
              sx={{ width: "100%" }}
              value={handelInput.role}
              onChange={(e, role) => handelModalChange(e, "role")}
            >
              <MenuItem value={"member"}>Member</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </Grid>
          <Grid justifyContent={"space-between"} display={"flex"}>
            <Button
              onClick={(e) => {
                handelAddsubmit(e);
              }}
              color="success"
              variant="contained"
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenADD(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}

export default AddMemberModal;
