import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function SnackBar({snackOpen , handlesnackClose}) {
  return (
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
  </Snackbar>  )
}

export default SnackBar