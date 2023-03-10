import { Paper, Table, TableContainer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterNotEqual } from "../../assets/functions/functions";
import EditMemberModal from "./table body/EditMemberModal";
import { useDispatch } from "react-redux";
import MembersTableFooter from "./MembersTableFooter";
import MemberTableHead from "./MemberTableHead";
import MemberTableBody from "./table body/MemberTableBody";
function MemberTable({
  usersSelector,
  setUsers,
  sethomeProfiles,
  setsnackOpen,
}) {
  const dispatch = useDispatch();

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

  const [handelInput, sethandelInput] = useState({
    id: usersSelector.length + 1,
    name: "",
    email: "",
    role: "",
  });

  // ## modal state
  const [open, setOpen] = React.useState(false);
  // ## modal function
  const handleClose = () => setOpen(false);
  // ## modal edit function

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
          <MemberTableHead />
          {/* body */}

          <MemberTableBody
            usersSelector={usersSelector}
            rowsPerPage={rowsPerPage}
            page={page}
            handelDelete={handelDelete}
            emptyRows={emptyRows}
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            setOpen={setOpen}
            sethandelInput={sethandelInput}
          />
        </Table>
        {/* end */}
      </TableContainer>

      <MembersTableFooter
        usersSelector={usersSelector}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        checkedState={checkedState}
        setUsers={setUsers}
        sethomeProfiles={sethomeProfiles}
        setsnackOpen={setsnackOpen}
      />

      <EditMemberModal
        handelInput={handelInput}
        setOpen={setOpen}
        handleClose={handleClose}
        open={open}
        usersSelector={usersSelector}
        setUsers={setUsers}
        sethomeProfiles={sethomeProfiles}
        sethandelInput={sethandelInput}
        setsnackOpen={setsnackOpen}
      />
    </Paper>
  );
}

export default MemberTable;
