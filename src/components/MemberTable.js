import {
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  checkBoxChecker,
  editFilter,
  filterNotEqual,
} from "../assets/functions/functions";
import EditMemberModal from "./EditMemberModal";
import { useDispatch } from "react-redux";
function MemberTable({
  usersSelector,
  setUsers,
  sethomeProfiles,
  setsnackOpen,
}) {
  const dispatch = useDispatch();

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
    const checker = checkBoxChecker(checkedState, index);
    setCheckedState(checker);
  };

  // ### handel delete row

  // ## delete function
  const handelDelete = (e) => {
    const targetLabel = e.currentTarget.getAttribute("aria-label");
    const filteredProfiles = filterNotEqual(usersSelector, "name", targetLabel);
    sethomeProfiles(filteredProfiles);
    dispatch(setUsers({ profiles: filteredProfiles }));
    setsnackOpen({
      state: true,
      message: `1 member deleted `,
      stateColor: "#ed5249",
      severity: "error",
    });
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
      stateColor: "#ed5249",
      severity: "error",
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
    const editedName = editFilter(usersSelector, targetLabel);
    sethandelInput({
      id: editedName[0]?.id,
      name: editedName[0]?.name,
      email: editedName[0]?.email,
      role: editedName[0]?.role,
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

  return (
    <Paper variant="outlined">
      <TableContainer
        sx={{
          background: "rgb(247,247,247)",
        }}
      >
        <Table sx={{ maxHeight: "90vh", overflow: "hidden" }}>
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
            {{ usersSelector } ? (
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
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
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
      <EditMemberModal
        handelInput={handelInput}
        handelModalChange={handelModalChange}
        handelsubmit={handelsubmit}
        setOpen={setOpen}
        handleClose={handleClose}
        open={open}
      />
    </Paper>
  );
}

export default MemberTable;
