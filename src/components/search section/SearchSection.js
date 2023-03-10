import { Button, Grid, Input, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../assets/functions/functions";
import AddMemberModal from "./AddMemberModal";
import SnackBar from "../general/SnackBar";

function SearchSection({
  snackOpen,
  handlesnackClose,
  usersSelector,
  setUsers,
  sethomeProfiles,
  profiles,
  handelModalChange,
  setsnackOpen,
}) {
  const [handelInput, sethandelInput] = useState({
    id: usersSelector.length + 1,
    name: "",
    email: "",
    role: "",
  });

  const dispatch = useDispatch();
  // ### Add member
  const [openADD, setOpenADD] = useState(false);
  const handelAdd = (e) => {
    setOpenADD(true);
  };

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
        <SnackBar snackOpen={snackOpen} handlesnackClose={handlesnackClose} />
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
        sethandelInput={sethandelInput}
        usersSelector={usersSelector}
        handelInput={handelInput}
        handelModalChange={handelModalChange}
        openADD={openADD}
        setOpenADD={setOpenADD}
        setsnackOpen={setsnackOpen}
        setUsers={setUsers}
      />
    </Paper>
  );
}

export default SearchSection;
