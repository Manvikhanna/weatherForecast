import { WiThermometer } from "react-icons/wi";
import styles from "./style.module.css";

export default function ForecastCard({ data }) {
  return (
    <div className={styles.card}>
      <p className={styles.date}>{new Date(data.dt_txt).toLocaleDateString()}</p>

      <img className={styles.icon} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="forecast" />

      <p className={styles.temp}>
        <WiThermometer className={styles.tempIcon} />
        {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
      </p>
    </div>
  );
}
