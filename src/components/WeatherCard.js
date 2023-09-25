import React from "react";
import { Button, Typography } from "@mui/material";

import Backdrop from "./Backdrop";
import ErrorMessage from "./ErrorMessage";

import "moment/locale/ar";

//Main Fn
export default function WeatherCard({
  weather,
  dateAndTime,
  locale,
  handleChangelanguageClick,
  t,
  content,
}) {
  if (content === "showWeather") {
    return (
      <div
        style={{
          minWidth: "360px",
          backgroundColor: "rgb(28 52 91 / 36%)",
          width: "100%",
          color: "white",
          padding: "20px 40px 0px",
          borderRadius: "15px",
          boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
        }}>
        {/* City And Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "400", marginBottom: "-10px" }}>
            {weather.cityName}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "300" }}>
            {dateAndTime}
          </Typography>
        </div>
        <hr style={{margin:"20px 0"}} />
        {/* Content Under City Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {/* All Temps  */}
          <div>
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
              }}>
              {weather.temp} <span style={{ fontSize: "40px" }}>°C</span>
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                fontWeight: "500",
              }}>
              <p>
                {t("Humidity: ")}
                {weather.humidity}
                {t(" g/kg")}
              </p>
              <p>
                {t("Wind speed: ")}
                {weather.windSpeed}
                {t(" km/h")}
              </p>
              <p>
                {t("Pressure: ")}
                {weather.pressure}
                {t(" millibar")}
              </p>
            </div>
          </div>
          {/* Icon And Status */}
          <div>
            <img
              style={{ width: "160px" }}
              src={weather.icon}
              alt="Weather Icon"
            />
            <Typography variant="h6" sx={{ marginTop: "-10px" }}>
              {t(weather.description)}
            </Typography>
          </div>
        </div>
        <Button
          onClick={handleChangelanguageClick}
          sx={{
            position: "relative",
            bottom: "-40px !important",
            left: "-255px !important",
          }}
          variant="text">
          {locale === "en" ? "عربي" : "English"}
        </Button>
      </div>
    );
  } else if (content === "showLoader") {
    return <Backdrop />;
  } else if (content === "showError") {
    return <ErrorMessage />;
  }
}
