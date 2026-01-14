import styles from "./style.module.css";

export default function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div className={styles.weatherCard}>
      <h2 className={styles.cityName}>
        {data.name}, {data.sys.country}
      </h2>

      <img className={styles.weatherIcon} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />

      <div className={styles.temperature}>{Math.round(data.main.temp)}°</div>

      <p className={styles.condition}>{data.weather[0].main}</p>

      <div className={styles.weatherDetails}>
        <span className={styles.detailItem}>Humidity: {data.main.humidity}%</span>
        <span className={styles.detailItem}>Wind: {data.wind.speed} m/s</span>
      </div>
    </div>
  );
}
