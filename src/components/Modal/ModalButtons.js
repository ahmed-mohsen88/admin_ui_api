import { Button, Grid } from "@mui/material";
import React from "react";

function ModalButtons({ name, handelAddsubmit, setOpenADD }) {
  return (
    <Grid justifyContent={"space-between"} display={"flex"}>
      <Button
        onClick={(e) => {
          handelAddsubmit(e);
        }}
        color="success"
        variant="contained"
      >
        {name}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpenADD(false)}
      >
        Cancel
      </Button>
    </Grid>
  );
}

export default ModalButtons;
