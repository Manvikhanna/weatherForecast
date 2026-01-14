import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import styles from "./style.module.css";

export default function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div className={styles.weatherCard}>
      <div className={styles.headerRow}>
        <h2 className={styles.cityName}>
          {data.name}, {data.sys.country}
        </h2>
        <p className={styles.condition}>
          <WiThermometer className={styles.conditionIcon} />
          {data.weather[0].main}
        </p>
      </div>

      <div className={styles.mainRow}>
        <img
          className={styles.weatherIcon}
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description || "current weather"}
        />

        <div className={styles.tempBlock}>
          <div className={styles.temperature}>{Math.round(data.main.temp)}°</div>
          {typeof data.main.feels_like === "number" && (
            <p className={styles.feelsLike}>Feels like {Math.round(data.main.feels_like)}°</p>
          )}
        </div>
      </div>

      <div className={styles.weatherDetails}>
        <span className={styles.detailItem}>
          <WiHumidity className={styles.detailIcon} />
          Humidity: {data.main.humidity}%
        </span>
        <span className={styles.detailItem}>
          <WiStrongWind className={styles.detailIcon} />
          Wind: {data.wind.speed} m/s
        </span>
      </div>
    </div>
  );
}
