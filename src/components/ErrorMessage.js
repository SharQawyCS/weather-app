import React from "react";
import { Typography } from "@mui/material";
import errorpic from "../errorpic.png";

export default function ErrorMessage() {
  return (
    <div
      style={{
        minHeight: "360px",
        backgroundColor: "rgb(28 52 91 / 36%)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "20px 40px 0px",
        borderRadius: "15px",
        boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
      }}>
      <img src={errorpic} alt="Error img" width="100px" />
      <Typography sx={{ marginTop: "40px", textAlign: "left" }} variant="h5">
        <span style={{ color: "#ff3333", fontWeight: "bold" }}>
          Can Not Get Location!
        </span>{" "}
        Please Check That You Enable Location, Or You Can Type Your Location
        Manually.
      </Typography>
    </div>
  );
}
