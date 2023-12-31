import { Typography } from "@mui/material";
import * as React from "react";

export default function SimpleBackdrop() {
  return (
    <div
      style={{
        minHeight: "360px",
        backgroundColor: "rgb(28 52 91 / 36%)",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "1.25rem 2.5rem 0px",
        borderRadius: "15px",
        boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
      }}>
      <div className="lds-hourglass"></div>
      <Typography sx={{ marginTop: "40px" }} variant="h3">
        Getting Location...
      </Typography>
    </div>
  );
}

//Backdrop Page Shows When Waiting For Connection Or Location
//It is a loader :)