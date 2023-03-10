import {
  Button,
  Checkbox,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  checkBoxChecker,
  editFilter,
} from "../../../assets/functions/functions";
function MemberTableBody({
  usersSelector,
  rowsPerPage,
  page,
  handelDelete,
  emptyRows,
  checkedState,
  setCheckedState,
  setOpen,
  sethandelInput,
}) {
  // ### check box
  // ## handel check box function
  const handelCheckBox = (e, index) => {
    const checker = checkBoxChecker(checkedState, index);
    setCheckedState(checker);
  };
  // ## edit state
  const [edit, setEdit] = useState({ case: false, name: "" });
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

  return (
    <TableBody>
      {{ usersSelector } &&
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
          })}
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
  );
}

export default MemberTableBody;
