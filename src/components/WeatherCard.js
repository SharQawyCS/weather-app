import React from "react";
import Backdrop from "./Backdrop";
import ErrorMessage from "./ErrorMessage";

import { Button, Typography } from "@mui/material";
import "moment/locale/ar";

//Main Fn
export default function WeatherCard({
  weather,
  dateAndTime,
  locale,
  handleChangelanguageClick,
  t, //Translation Function From i18n.js
  content,
}) {
  //To Convert English Numbers To Arabic Numbers When Locale = "ar"
  const c = (num) => {
    if (locale === "ar") {
      const arabicNumbers =
        "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
      let str = num.toString().replace(/[0123456789]/g, (d) => {
        return arabicNumbers[d];
      });
      return (<>{str}</>).props.children;
    } else {
      return num;
    }
  };

  console.log(c(53425)); //٥٣٤٢٥

  //Wheather Widget
  if (content === "showWeather") {
    return (
      <div
        style={{
          minWidth: "150px",
          backgroundColor: "rgb(28 52 91 / 36%)",
          width: "90%",
          color: "white",
          padding: "1.25rem 2.5rem 0px",
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
            sx={{ fontWeight: "400", marginBottom: "-0.625rem" }}>
            {weather.cityName}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "300" }}>
            {dateAndTime}
          </Typography>
        </div>
        <hr style={{ margin: "1.25rem 0" }} />
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
              {c(weather.temp)}{" "}
              <span style={{ fontSize: "1.5rem" }}>{t("°C")}</span>
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
                {c(weather.humidity)}
                {t(" g/kg")}
              </p>
              <p>
                {t("Wind speed: ")}
                {c(weather.windSpeed)}
                {t(" km/h")}
              </p>
              <p>
                {t("Pressure: ")}
                {c(weather.pressure)}
                {t(" millibar")}
              </p>
            </div>
          </div>
          {/* Icon And Status */}
          <div>
            <img
              style={{ width: "10rem" }}
              src={weather.icon}
              alt="Weather Icon"
            />
            <Typography variant="h6" sx={{ marginTop: "-0.625rem" }}>
              {t(weather.description)}
            </Typography>
          </div>
        </div>
        <Button
          onClick={handleChangelanguageClick}
          sx={{
            color: "#d5c1ff",
            position: "relative",
            bottom: "-40px !important",
            left: "-50% !important",
          }}
          variant="text">
          {locale === "en" ? "اللُغَةُ العَرَبِيَّةُ" : "English"}
        </Button>
      </div>
    );
  }
  //Loader Widget
  else if (content === "showLoader") {
    return <Backdrop />;
  }
  //Error Widget
  else if (content === "showError") {
    return <ErrorMessage />;
  }
}
