import { Button, Chip, Container, Grid, TablePagination } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteAll, getCount } from "../../assets/functions/functions";

function MembersTableFooter({
  usersSelector,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  checkedState,
  setUsers,
  sethomeProfiles,
  setsnackOpen,
}) {
  const dispatch = useDispatch();
  // // ### Delete all button
  // // ## delete all function if checked
  const handelDeleteAll = (e) => {
    e.preventDefault();
    const newHomeProf = [...usersSelector];
    // array contain deleted items
    const arr = deleteAll(newHomeProf, checkedState);
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
  return (
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
            page={!usersSelector.length || usersSelector.length <= 0 ? 0 : page}
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
            label={`Admin ${getCount(usersSelector, "role", "admin")}`}
          />
          <Chip
            sx={{
              backgroundColor: "rgb(34,183,121)",
              color: "white",
              width: "100px",
            }}
            label={`Admin ${getCount(usersSelector, "role", "member")}`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MembersTableFooter;
