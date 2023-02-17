import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { users, setUsers } from "./redux/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./home.css";

function Home(profiles) {
  // ### main state
  const [homeProfiles, sethomeProfiles] = useState(null);
  // ### Global vaariables
  const dispatch = useDispatch();
  const usersSelector = useSelector(users);

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
      const filteredProfiles = usersSelector.filter((filteredProfile) => {
        return (
          filteredProfile?.name
            .toLowerCase()
            .match(searchInput.toLowerCase()) ||
          filteredProfile?.email
            .toLowerCase()
            .match(searchInput.toLowerCase()) ||
          filteredProfile?.role.toLowerCase().match(searchInput.toLowerCase())
        );
      });
      dispatch(setUsers({ profiles: filteredProfiles }));
      sethomeProfiles(filteredProfiles);
    } else {
      //check if user write - letters
      dispatch(setUsers(profiles));
      sethomeProfiles(usersSelector);
    }
  };

  // ### Edit  button

  // ## edit state
  const [edit, setEdit] = useState({ case: false, name: "" });
  const [handelInput, sethandelInput] = useState({
    id: usersSelector.length + 1,
    name: "",
    email: "",
    role: "",
  });
  // ## edit function >> open modal >> set original value for input
  const handelEdit = (e) => {
    const targetLabel = e.currentTarget.getAttribute("aria-label");
    setOpen(true);
    const editedName = usersSelector?.filter((filteredProfile) => {
      return filteredProfile.email === targetLabel;
    });
    sethandelInput({
      id: editedName[0]?.id,
      name: editedName[0]?.name,
      email: editedName[0]?.email,
      role: editedName[0]?.role,
    });
  };

  // ### modal

  // ## modal state
  const [open, setOpen] = React.useState(false);
  // ## modal function
  const handleClose = () => setOpen(false);
  // ## modal edit function
  const handelModalChange = (e, value) => {
    const newInput = { ...handelInput };
    newInput[value] = e.target.value;
    sethandelInput(newInput);
  };
  // ## on modal submit
  const handelsubmit = (e) => {
    // delete the original row
    const filteredProfile = usersSelector.filter((profile) => {
      return profile?.id !== handelInput?.id;
    });
    // add new row
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

  useEffect(() => {
    dispatch(setUsers(profiles));
  }, [dispatch, profiles]);

  // ### handel delete row

  // ## delete function
  const handelDelete = (e) => {
    const filteredProfiles = usersSelector.filter((filteredProfile) => {
      return (
        filteredProfile?.name !== e.currentTarget.getAttribute("aria-label")
      );
    });
    sethomeProfiles(filteredProfiles);
    dispatch(setUsers({ profiles: filteredProfiles }));
    setsnackOpen({
      state: true,
      message: `1 member deleted `,
      stateColor: "rgb(211,47,47)",
    });
  };

  // ### check box

  // ## check box state
  const [checkedState, setCheckedState] = useState(
    // initialize by array of false corresponding to number of rows
    usersSelector.map(() => {
      return false;
    })
  );
  // ## check box state initialization
  useEffect(() => {
    setCheckedState(
      usersSelector.map(() => {
        return false;
      })
    );
  }, [usersSelector]);

  // ## handel check box function
  const handelCheckBox = (e, index) => {
    const checker = checkedState.map((el, ind) => {
      if (index === ind) {
        if (el === true) {
          return (el = false);
        } else {
          return (el = true);
        }
      } else {
        return el;
      }
    });
    setCheckedState(checker);
  };

  // ### Delete all button
  // ## delete all function if checked
  const handelDeleteAll = (e) => {
    e.preventDefault();
    const newHomeProf = [...usersSelector];
    // array contain deleted items
    const arr = [];
    newHomeProf.map((prof, index) => {
      checkedState.map((ch, ind) => {
        if (ch === true && ind === index) {
          arr.push(prof);
        }
      });
    });
    // final filter array
    const x = newHomeProf.filter((el) => {
      return !arr.includes(el);
    });

    dispatch(setUsers({ profiles: x }));
    sethomeProfiles(x);
    setsnackOpen({
      state: true,
      message: `${arr.length} members deleted (${arr.map((el) => {
        return el.name + " ";
      })})`,
      stateColor: "#d32f2f",
      severity: "success",
    });
  };

  // ### pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersSelector.length) : 0;

  // ### Add member
  const [openADD, setOpenADD] = useState(false);
  const handelAdd = (e) => {
    setOpenADD(true);
  };
  const handelAddsubmit = () => {
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
  };

  // ### snacck bar

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
    <Container
      sx={{
        padding: "30px",
        background: "linear-gradient(45deg, rgb(88, 84, 236), transparent)",
      }}
    >
      {/* navbar */}
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
      {/* search section */}
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
      </Paper>

      {/* table */}
      <Paper variant="outlined">
        <TableContainer
          sx={{
            background: "rgb(247,247,247)",
          }}
        >
          <Table sx={{ maxHeight: "90vh", overflow: "hidden" }} >
            {/* head */}
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
            {/* body */}
            <TableBody>
              {usersSelector ? (
                usersSelector
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((profile, index) => {
                    return (
                      <TableRow key={profile?.id} id={profile?.email}>
                        <TableCell>
                          <Checkbox
                            checked={checkedState[index] || false}
                            onChange={(e) => {
                              handelCheckBox(e, index);
                            }}
                          ></Checkbox>
                        </TableCell>
                        {edit.case && edit.name === profile.name ? (
                          <form>
                            <TextField type="text" placeholder="change Name" />
                          </form>
                        ) : (
                          <TableCell>{profile?.name}</TableCell>
                        )}
                        <TableCell>{profile?.email}</TableCell>
                        <TableCell>{profile?.role} </TableCell>
                        <TableCell>
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "10px",
                              height: "100%",
                            }}
                          >
                            <Button
                              aria-label={profile?.name}
                              onClick={(e) => {
                                handelDelete(e);
                              }}
                            >
                              <DeleteIcon color="error" />
                            </Button>
                            <Button
                              aria-label={profile?.email}
                              onClick={(e) => {
                                handelEdit(e);
                              }}
                            >
                              <EditIcon
                                sx={{
                                  color: "rgb(34,183,121)",
                                }}
                              />
                            </Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow></TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* end */}
        </TableContainer>

        <Container sx={{ padding: "20px", background: "rgb(247,247,247)" }}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item={true}>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  handelDeleteAll(e);
                }}
              >
                Delete Selected
              </Button>
            </Grid>
            <Grid
              item={true}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={usersSelector.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
            <Grid display={"flex"} gap={"10px"}>
              <Chip
                sx={{
                  backgroundColor: "rgb(34,183,121)",
                  color: "white",
                  width: "100px",
                }}
                label={`Admin ${
                  usersSelector.filter((el) => {
                    return el.role === "admin";
                  }).length
                }`}
              />
              <Chip
                sx={{
                  backgroundColor: "rgb(34,183,121)",
                  color: "white",
                  width: "100px",
                }}
                label={`Member ${
                  usersSelector.filter((el) => {
                    return el.role === "member";
                  }).length
                }`}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
      {/* add member modal */}
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
    </Container>
  );
}

export default Home;
