import "./App.css";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";

//From libraries
import axios from "axios";
import moment, { locale } from "moment";
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

  const [content, setContent] = useState("showLoader"); //Decide To show loader Or Content
  const { t, i18n } = useTranslation(); //calling i18next
  const [locale, setLocale] = useState("en"); //current language

  const dateAndTime = moment().locale(locale).format("ddd D MMM"); //Date According to locale
  let apiKey = `41df8a613dcf8e7b16ec231a986871b4`; // :)

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
    const newLocale = locale === "en" ? "ar" : "en";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale); // تخزين القيمة في local storage
  }

  useEffect(() => {}, [i18n, locale]);
  //Change Site Lang
  // useEffect(() => {
  //   i18n.changeLanguage(locale);
  // }, [i18n, locale]);

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      setLocale(storedLocale);
    }

    // let locale = storedLocale;
    // API TO Get DATA BY LAT AND LONG
    function getWeather(lat, lon) {
      let cancelAxios = null;
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&lang=${storedLocale}`,
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
          setContent("showWeather"); //To Disable Loader And Show Weather Content
        })
        .catch(function () {
          setContent("showError");
        });

      return () => {
        cancelAxios(); //To Stop Requset After Getting Info
      };
    }

    //Get Position [ latitude - longitude ] And Call getWeather
    function success(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    }
    function error() {
      setContent("showError");
    }
    if (!navigator.geolocation) {
      setContent("showError");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    i18n.changeLanguage(locale);
  }, [apiKey, i18n, locale]);

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

// TODO: Add Search Box , Header , Footer
// TODO: Add Made With
