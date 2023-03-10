import { Alert, Button, Grid, Input, Paper, Snackbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../assets/functions/functions";
import AddMemberModal from "./AddMemberModal";

function SearchSection({
  snackOpen,
  handlesnackClose,
  usersSelector,
  setUsers,
  sethomeProfiles,
  profiles,
  handelModalChange,
  setsnackOpen
}) {


  const [handelInput, sethandelInput] = useState({
    id: usersSelector.length + 1,
    name: "",
    email: "",
    role: "",
  });

  // ### Add member
  const [openADD, setOpenADD] = useState(false);
  const handelAdd = (e) => {
    setOpenADD(true);
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

  const dispatch = useDispatch();
  // ### Search

  // ## Search state
  const [searchInput, setsearchInput] = useState("");
  const preInput = useRef("");
  useEffect(() => {
    preInput.current = searchInput;
  }, [searchInput]);
  //## Search Handler
  const handelSearch = (e) => {
    const input = e.target.value;
    setsearchInput(input);
    // check if user write + search letters
    if (input.length - preInput.current.length > 0) {
      const filteredProfiles = searchByName(usersSelector, searchInput);
      dispatch(setUsers({ profiles: filteredProfiles }));
      sethomeProfiles(filteredProfiles);
    } else {
      //check if user write - letters
      dispatch(setUsers(profiles));
      sethomeProfiles(usersSelector);
    }
  };
  return (
    <Paper variant="outlined">
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"20px"}
        sx={{
          background: "rgb(247,247,247)",
        }}
      >
        <Button
          style={{
            backgroundColor: "rgb(88,84,236)",
          }}
          variant="contained"
          onClick={(e) => handelAdd(e)}
        >
          Add member
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackOpen.state}
          autoHideDuration={6000}
          onClose={handlesnackClose}
          message={snackOpen.message}
          // color={snackOpen.stateColor}
        >
          <Alert
            onClose={handlesnackClose}
            sx={{
              width: "100%",
              background: snackOpen.stateColor,
              color: "white",
            }}
            severity={snackOpen.severity}
          >
            {snackOpen.message}
          </Alert>
        </Snackbar>

        <Input
          startAdornment={<SearchIcon color={"action"} />}
          placeholder="Search By Name, Email and role"
          sx={{ width: "24%" }}
          onChange={(e) => {
            handelSearch(e);
          }}
        />
      </Grid>
      {/* add member modal */}
      <AddMemberModal
        handelInput={handelInput}
        handelModalChange={handelModalChange}
        handelAddsubmit={handelAddsubmit}
        setOpenADD={setOpenADD}
        openADD={openADD}
        sethandelInput={sethandelInput}
      />
    </Paper>
  );
}

export default SearchSection;
