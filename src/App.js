import "./App.css";
import { useEffect, useState } from "react";

//From libraries
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

//MUI
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

let cancelAxios = null;

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["ibm"], //Main Font
    },
  });

  const { t, i18n } = useTranslation(); //calling i18next
  const [locale, setLocale] = useState("en");

  const dateAndTime = moment().locale(locale).format("ddd D MMM"); //Date According to locale

  const [weather, setWeather] = useState({
    cityName: "",
    temp: null,
    description: "",
    humidity: null,
    windSpeed: null,
    pressure: null,
    icon: "",
  });

  function handleChangelanguageClick() {
    locale === "en" ? setLocale("ar") : setLocale("en");
  }

  //Change Site Lang
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, setLocale, i18n]);

  useEffect(() => {
    let lat = "30.0444";
    let lon = "31.2357";
    let apiKey = `41df8a613dcf8e7b16ec231a986871b4`;

    //API request
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&lang=${locale}`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        let responseTemp = Math.round(response.data.main.temp - 273);
        let responseCityName = response.data.name;
        let responseDescription = response.data.weather[0].description;
        let responseHumidity = Math.round(response.data.main.humidity);
        let responseWindSpeed = Math.round(response.data.wind.speed);
        let responsePressure = Math.round(response.data.main.pressure);
        let responseIcon = response.data.weather[0].icon;
        setWeather({
          cityName: responseCityName,
          temp: responseTemp,
          description: responseDescription,
          humidity: responseHumidity,
          windSpeed: responseWindSpeed,
          pressure: responsePressure,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    return () => {
      cancelAxios(); //To Stop Requset After Getting Info
    };
  }, [locale, setLocale, i18n]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="sm"
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {/* Card */}
          <div
            style={{
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
            <hr />
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
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
