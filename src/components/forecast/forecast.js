import ForecastCard from "../forecastCard/forecastCard";
import styles from "./style.module.css";

export default function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {forecast.map((item) => (
        <ForecastCard key={item.dt} data={item} />
      ))}
    </div>
  );
}
