import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { users, setUsers } from "../redux/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/home.css";
import NavBar from "../components/general/NavBar";
import SearchSection from "../components/search section/SearchSection";
import MemberTable from "../components/Table/MemberTable";

function Home(profiles) {
  // ### main state
  const [homeProfiles, sethomeProfiles] = useState(null);
  // ### Global variables
  const dispatch = useDispatch();
  const usersSelector = useSelector(users);

  useEffect(() => {
    dispatch(setUsers(profiles));
  }, [dispatch, profiles]);

  // ### snack bar
  const [snackOpen, setsnackOpen] = React.useState({
    state: false,
    message: "",
    stateColor: "unset",
    severity: "success",
  });
  const handlesnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackOpen({
      state: false,
      message: "",
      stateColor: "unset",
      severity: "success",
    });
  };

  return (
    <main>
      <Container
        sx={{
          padding: "30px",
          background: "linear-gradient(45deg, rgb(88, 84, 236), transparent)",
        }}
      >
        {/* navbar */}
        <NavBar />
        {/* search section */}
        <SearchSection
          snackOpen={snackOpen}
          handlesnackClose={handlesnackClose}
          usersSelector={usersSelector}
          setUsers={setUsers}
          sethomeProfiles={sethomeProfiles}
          profiles={profiles}
          setsnackOpen={setsnackOpen}
        />
        {/* table */}
        <MemberTable
          usersSelector={usersSelector}
          setUsers={setUsers}
          sethomeProfiles={sethomeProfiles}
          setsnackOpen={setsnackOpen}
        />
      </Container>
    </main>
  );
}

export default Home;
