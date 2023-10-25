import { Await, useLoaderData } from "react-router-dom";
import NewsCard from "./NewsCard";
import UserCard from "./UserCard";
import WeatherCard from "./WeatherCard";
import styles from "./styles/index.module.css";
import { Suspense } from "react";
import NewsCardSkeleton from "./NewsCardSkeleton";
import WeatherCardSkeleton from "./WeatherCardSkeleton";
import FallbackError from "./FallbackError";
import NotesCard from "./NotesCard";
import TimerCard from "./TimerCard";
import { Button } from "../../components/ui";

export default function HomePage() {
  const { news, weather } = useLoaderData();

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.leftGroup}>
            <TopComponents weather={weather} />
            <TimerCard />
          </div>
          <Suspense fallback={<NewsCardSkeleton />}>
            <Await resolve={news} errorElement={<FallbackError />}>
              {(resolvedNews) => <NewsCard news={resolvedNews[0]} />}
            </Await>
          </Suspense>
        </main>

        <div className={styles.browseButton}>
          <Button variant="secondary">Browse</Button>
        </div>
      </div>
    </>
  );
}

const TopComponents = ({ weather }) => {
  return (
    <div className={styles.topComponents}>
      <div className={styles.userAndWeather}>
        <UserCard />
        <Suspense fallback={<WeatherCardSkeleton />}>
          <Await resolve={weather} errorElement={<FallbackError />}>
            {(resolvedWeather) => <WeatherCard weather={resolvedWeather} />}
          </Await>
        </Suspense>
      </div>
      <NotesCard />
    </div>
  );
};
