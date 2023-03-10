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
import { filterNotEqual } from "../../../assets/functions/functions";
import { useDispatch } from "react-redux";
import AddFields from "../../Modal/AddFields";
import ModalButtons from "../../Modal/ModalButtons";

function EditMemberModal({
  handelInput,
  setOpen,
  handleClose,
  open,
  usersSelector,
  setUsers,
  sethomeProfiles,
  sethandelInput,
  setsnackOpen,
}) {
  const dispatch = useDispatch();

  // ## modal edit function
  const handelModalChange = (e, value) => {
    const newInput = { ...handelInput };
    newInput[value] = e.target.value;
    sethandelInput(newInput);
  };
  // ## on modal submit
  const handelsubmit = (e) => {
    // delete the original row
    const filteredProfile = filterNotEqual(
      usersSelector,
      "id",
      handelInput?.id
    );
    filteredProfile.unshift(handelInput);
    dispatch(setUsers({ profiles: filteredProfile }));
    sethomeProfiles(filteredProfile);
    setOpen(false);
    sethandelInput({
      id: usersSelector.length + 1,
      name: "",
      email: "",
      role: "",
    });
    setsnackOpen({
      state: true,
      message: `Edit Success`,
      stateColor: "rgb(34,183,121)",
      severity: "success",
    });
  };



  
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
          <AddFields
            name="Edit Name"
            refName="name"
            handelModalChange={handelModalChange}
            handelInput={handelInput}
          />

          <AddFields
            name="Edit Email"
            refName="email"
            handelModalChange={handelModalChange}
            handelInput={handelInput}
          />

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
          <ModalButtons
            name="Submit"
            handelAddsubmit={handelsubmit}
            setOpenADD={setOpen}
          />
        </Container>
      </Box>
    </Modal>
  );
}

export default EditMemberModal;
