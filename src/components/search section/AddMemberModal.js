import {
  Box,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import React from "react";
import AddFields from "../Modal/AddFields";
import ModalButtons from "../Modal/ModalButtons";
import { useDispatch } from "react-redux";

function AddMemberModal({
  handelInput,
  setOpenADD,
  openADD,
  sethandelInput,
  setsnackOpen,
  usersSelector,
  setUsers,
}) {
  const dispatch = useDispatch();
  const handelModalChange = (e, value) => {
    const newInput = { ...handelInput };
    newInput[value] = e.target.value;
    sethandelInput(newInput);
  };

  const handelAddsubmit = () => {
    if (!handelInput.name || !handelInput.email || !handelInput.role) {
      setsnackOpen({
        state: true,
        message: "All fields should be filled",
        stateColor: "#f7c600",
        severity: "warning",
      });
    } else {
      const addedUser = [...usersSelector];
      const arrLength = addedUser.length + 1;
      addedUser.push({
        id: `${arrLength}`,
        name: handelInput.name,
        email: handelInput.email,
        role: handelInput.role,
      });
      dispatch(setUsers({ profiles: addedUser }));
      sethandelInput({
        id: usersSelector.length + 1,
        name: "",
        email: "",
        role: "",
      });
      setOpenADD(false);
      setsnackOpen({
        state: true,
        message: "Successfully Added",
        stateColor: "rgb(34,183,121)",
        severity: "success",
      });
    }
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
          <AddFields
            name="Name"
            refName="name"
            handelModalChange={handelModalChange}
            handelInput={handelInput}
          />
          <AddFields
            name="Email"
            refName="email"
            handelModalChange={handelModalChange}
            handelInput={handelInput}
          />
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
          <ModalButtons
            name="Add"
            handelAddsubmit={handelAddsubmit}
            setOpenADD={setOpenADD}
          />
        </Container>
      </Box>
    </Modal>
  );
}

export default AddMemberModal;
