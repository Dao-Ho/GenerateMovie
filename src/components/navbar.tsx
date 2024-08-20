"use client";

import Image from "next/image";
import { useRouter } from "next/router";

import frame from "../../public/frame.png";
import unopenedNotification from "../../public/unopened_notification.png";
import notification from "../../public/notification.png";
import profile from "../../public/profile.png";
import settings from "../../public/settings.png";

import { useEffect, useState } from "react";

const Navbar = () => {
  //what tab we are currently on
  const [currentPath, setCurrentPath] = useState<String | null>(null);

  //initializes the currentPath's state with our current route: is used to determine which tab is currently active
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  //checks if the current tab is the same as the tabPath
  const isCurrentTab = (tabPath: string) => currentPath === tabPath;

  //keeps track of whether the user has a notification: with a more elaborate backend, we would fetch this from our API/DB
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div className={styles.navbarContainer}>
      <a href="/">
        <div className={styles.logoContainer}>
          <div className="w-[3vw] h-[3vw]">
            <Image src={frame} alt="logo" sizes="3vw, 3vw" />
          </div>
          <h1 className={styles.generateText}>Generate</h1>
          <h1 className={styles.moviesText}>Movies</h1>
        </div>
      </a>
      <div className={styles.optionsContainer}>
        <div className={styles.pageOptionsContainer}>
          <a
            className={`${
              isCurrentTab("/") ? "underline text-Alien-Blue" : ""
            } ${styles.pageOptions}`}
            href="/"
          >
            Home
          </a>
          <a
            className={`${
              isCurrentTab("/movies") ? "underline text-Alien-Blue" : ""
            } ${styles.pageOptions}`}
            href="/movies"
          >
            Movies
          </a>
          <a
            className={`${
              isCurrentTab("/series") ? "underline text-Alien-Blue" : ""
            } ${styles.pageOptions}`}
            href="/series"
          >
            Series
          </a>
        </div>
        <div className={styles.userOptionsContainer}>
          <div className={styles.smallLogoContainer}
          onClick={() => (setHasNotification(false))}>
            {hasNotification ? (
              <Image
                src={unopenedNotification}
                alt="profile"
                sizes=""
                className={styles.smallLogo}
              />
            ) : (
              <Image
                src={notification}
                alt="profile"
                sizes=""
                className={styles.smallLogo}
              />
            )}
          </div>
          <div className={styles.smallLogoContainer}>
            <Image
              src={profile}
              alt="profile"
              sizes=""
              className={styles.smallLogo}
            />
          </div>
          <div className={styles.smallLogoContainer}>
            <Image
              src={settings}
              alt="profile"
              sizes=""
              className={styles.smallLogo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbarContainer:
    "w-[100vw] bg-Midnight h-[12vh] flex flex-row items-center px-[4vw] justify-between",
  logoContainer: "flex flex-row items-center",
  pageOptionsContainer: "flex flex-row space-x-[2vw]",
  pageOptions:
    "hover:text-Alien-Blue hover:cursor-pointer hover:underline underline-offset-[1.5vh] text-[1vw]",
  userOptionsContainer: "pl-[4vw] flex flex-row space-x-[2vw] items-center",
  optionsContainer: "flex flex-row items-center",
  generateText: "pl-[1vw] text-[1.5vw] font-bold",
  moviesText: "text-[1.5vw] font-bold text-Alien-Blue",
  smallLogoContainer:
    "flex items-center justify-center w-[1.5vw] h-[1.5vw] cursor-pointer transition-all",
  smallLogo:
    "w-[1.25vw] h-[1.25vw] hover:w-[1.5vw] hover:h-[1.5vw] transition-all",
};

export default Navbar;
