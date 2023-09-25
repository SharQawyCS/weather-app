import "./App.css";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";

//From libraries
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

//MUI
import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["ibm"], //Main Font
    },
  });

  const [content, setContent] = useState("show loader"); //Decide To show loader Or Content

  const { t, i18n } = useTranslation(); //calling i18next
  const [locale, setLocale] = useState("en");

  const dateAndTime = moment().locale(locale).format("ddd D MMM"); //Date According to locale

  const [adress, setAdress] = useState({ lon: null, lat: null });
  let apiKey = `41df8a613dcf8e7b16ec231a986871b4`;

  //Weather Data State
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
    //! API TO Get DATA BY LAT AND LONG
    function getWeather() {
      let cancelAxios = null;
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${adress.lat}&lon=${adress.lon}&APPID=${apiKey}&lang=${locale}`,
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
    }

    //! ////////////////////////////////////////////

    function geoFindMe() {
      function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setAdress({ lon: longitude, lat: latitude });
        getWeather();
        console.log("Called getWeather from geoFindMe");
      }

      function error() {
        console.log("Unable to retrieve your location");
      }

      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
      } else {
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }

    //! ////////////////////////////////////////////

    geoFindMe();
  }, [locale, setLocale, i18n, adress.lon, adress.lat, apiKey]);

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
          <WeatherCard
            weather={weather}
            dateAndTime={dateAndTime}
            locale={locale}
            handleChangelanguageClick={handleChangelanguageClick}
            t={t}
            content={content}
          />
          {/* ====== Card ======= */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
