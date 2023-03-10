import { Grid, Input, InputLabel } from "@mui/material";
import React from "react";

function AddFields({ name, refName, handelModalChange, handelInput }) {
  return (
    <Grid key={"edit" + name}>
      <InputLabel>{name}</InputLabel>
      <Input
        type="text"
        sx={{ width: "100%" }}
        value={handelInput[refName]}
        onChange={(e) => handelModalChange(e, refName)}
      />
    </Grid>
  );
}

export default AddFields;
