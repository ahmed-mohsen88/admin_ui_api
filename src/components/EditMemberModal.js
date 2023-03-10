import { Box, Button, Container, Grid, Input, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import React from "react";

function EditMemberModal({handelInput , handelModalChange , handelsubmit , setOpen, handleClose ,  open}) {
 
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
            <InputLabel>Edit Name</InputLabel>
            <Input
              type="text"
              sx={{ width: "100%" }}
              value={handelInput.name}
              onChange={(e, name) => handelModalChange(e, "name")}
            />
          </Grid>
          <Grid>
            <InputLabel>Edit Email</InputLabel>
            <Input
              type="text"
              sx={{ width: "100%" }}
              value={handelInput.email}
              onChange={(e, email) => handelModalChange(e, "email")}
            />
          </Grid>
          <Grid>
            <InputLabel>Edit role</InputLabel>
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
                handelsubmit(e);
              }}
              color="success"
              variant="contained"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
}

export default EditMemberModal;
