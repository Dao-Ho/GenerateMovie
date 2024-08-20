"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

//dropdown select component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

import axios, { AxiosResponse } from "axios";

//import Icons
import star from "../../public/star.png";

export default function Home() {
  //use state to whether render user's reccomendations or their current watchlist
  const [isRecommendations, setIsReccomendations] = useState(true);
  const [topMovies, setTopMovies] = useState<AxiosResponse | null>(null);
  const [reccomendations, setReccomendations] = useState(null);
  const [watching, setWatching] = useState(null);
  const [bottomRow, setBottomRow] = useState(null);

  //reusable movie overlay component for smallTopPicks
  const SmallMovieOverlay = ({ movie }) => (
    <div className="flex flex-col absolute z-20 ml-[1vw] ">
      <div className="items-center pt-[9vh]">
        <h1 className="text-white font-bold text-[1.25vw] w-full">
          {movie.title}
        </h1>
        <div className="flex flex-row items-center">
          {Array.from(
            { length: Math.ceil(movie.rottenTomatoesScore / 20) },
            () => (
              <div className=" relative w-[0.75vw] h-[0.75vw] mx-[0.25vh]">
                <Image src={star} alt="logo" layout="fill" objectFit="cover" />
              </div>
            )
          )}
        </div>
        <h1 className="text-white font-semibold text-[0.50vw] mt-[1vh]">
          {movie.genres.join("\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0")}
        </h1>
      </div>
    </div>
  );

  //resuable overlay for movies on the bottom row
  const BottomRowOverlay = ({ movie , movieIndex}) => (
    <div className="flex flex-col absolute z-20 ml-[1vw] ">
      <h1 className="ml-[13vw] text-[4vw] font-bold">{movieIndex}</h1>
      <div className="items-center pt-[9vh]">
        <h1 className="text-white font-bold text-[1.25vw] w-full">
          {movie.title}
        </h1>
        <div className="flex flex-row items-center">
          {Array.from(
            { length: Math.ceil(movie.rottenTomatoesScore / 20) },
            () => (
              <div className=" relative w-[0.75vw] h-[0.75vw] mx-[0.25vh]">
                <Image src={star} alt="logo" layout="fill" objectFit="cover" />
              </div>
            )
          )}
        </div>
        <h1 className="text-white font-semibold text-[0.50vw] mt-[1vh]">
          {movie.genres.join("\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0")}
        </h1>
      </div>
    </div>
  );

  //reusable movie poster component, if the movie is queried, show the poster, else show loading animation
  const MoviePoster = ({ movie }) => (
    <div className="h-full w-full">
      {movie?.posterURL ? (
        <Image
          src={movie.posterURL}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className={styles.imageProperties}
        />
      ) : (
        <div className={styles.loadingAnimation}></div>
      )}
    </div>
  );

  const getTopMovies = async () => {
    try {
      const res = await axios.get("/api/top-movies");
      setTopMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getReccomendations = async () => {
    if (reccomendations) {
      return reccomendations;
    } else {
      try {
        const res = await axios.get("/api/recommend");
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getWatching = async () => {
    if (watching) {
      return watching;
    } else {
      try {
        const res = await axios.get("/api/watching");
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }
  };

  async function handleValueChange(value) {
    switch (value) {
      case "watching":
        setIsReccomendations(false);
        await getWatching().then((watching) => {
          setBottomRow(watching);
        });
        break;
      default:
        setIsReccomendations(true);
        await getReccomendations().then((rec) => {
          setBottomRow(rec);
        });
        console.log("handle recommendations");
        break;
    }
  }

  //upon initialization, fetch the week's top movies and either their current watch list of reccomendations
  useEffect(() => {
    getTopMovies();
    //get list of reccomendations and set the bottom row as the list of queried movies
    getReccomendations().then((reccomendations) => {
      setBottomRow(reccomendations);
    });
  }, []);

  return (
    <main>
      <div className="px-[4vw] py-[2vw] flex flex-col space-y-[2vh]">
        <h1 className={styles.headings}>This week&apos;s Top Picks</h1>

        <div className="flex flex-row space-x-[2vh]">
          <div className={styles.largeTopPick}>
            {topMovies && topMovies[0]?.posterURL ? (
              <div>
                <div className="flex flex-col absolute z-20">
                  <h1 className="text-white font-bold text-[2.5vw] ml-[3vw] w-full mt-[22vh]">
                    {topMovies[0]?.title}
                  </h1>
                  <h1 className="text-white font-semibold text-[1vw] ml-[3vw] w-full ">
                    A film by {topMovies[0]?.directors}
                  </h1>
                  <div className="flex flex-row items-center space-x-[1vw] py-[2vh]">
                    <h1 className="text-white font-semibold text-[0.50vw] ml-[3vw] ">
                      {topMovies[0]?.genres.join(
                        "\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0"
                      )}
                    </h1>
                    <div className="ml-[1vw] flex flex-row items-center ">
                      {Array.from(
                        {
                          length: Math.ceil(
                            topMovies[0]?.rottenTomatoesScore / 20
                          ),
                        },
                        () => (
                          <div className=" relative w-[0.75vw] h-[0.75vw] mx-[0.25vh]">
                            <Image
                              src={star}
                              alt="logo"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <MoviePoster movie={topMovies ? topMovies[0] : undefined} />
              </div>
            ) : (
              <div className={styles.loadingAnimation}></div>
            )}
          </div>

          <div className="flex flex-grow flex-col space-y-[2vh]">
            <div className="flex flex-row space-x-[2vh]">
              <div className={styles.smallTopPick}>
                {topMovies ? (
                  <div>
                    <SmallMovieOverlay movie={topMovies[1]} />
                    <MoviePoster movie={topMovies[1]} />
                  </div>
                ) : (
                  <div className={styles.loadingAnimation}></div>
                )}
              </div>
              <div className={styles.smallTopPick}>
                {topMovies ? (
                  <div>
                    <SmallMovieOverlay movie={topMovies[2]} />
                    <MoviePoster movie={topMovies[2]} />
                  </div>
                ) : (
                  <div className={styles.loadingAnimation}></div>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-[2vh]">
              <div className={styles.smallTopPick}>
                {topMovies ? (
                  <div>
                    <SmallMovieOverlay movie={topMovies[3]} />
                    <MoviePoster movie={topMovies[3]} />
                  </div>
                ) : (
                  <div className={styles.loadingAnimation}></div>
                )}
              </div>
              <div className={styles.smallTopPick}>
                {topMovies ? (
                  <div>
                    <SmallMovieOverlay movie={topMovies[4]} />
                    <MoviePoster movie={topMovies[4]} />
                  </div>
                ) : (
                  <div className={styles.loadingAnimation}></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row space-x-[3vw] items-center">
          <h1 className={styles.headings}>
            {isRecommendations ? "Your Reccomendations" : "Continue Watching"}
          </h1>
          <Select
            onValueChange={(value) => {
              handleValueChange(value);
            }}
          >
            <SelectTrigger className="w-[15vw] border-none text-[1vw] h-[4vh]">
              <SelectValue placeholder="Recommendations" />
            </SelectTrigger>
            <SelectContent className="bg-Midnight ">
              <SelectItem value="recommendations" className={styles.selectItem}>
                Recommendations
              </SelectItem>
              <SelectItem
                value="watching"
                onClick={async () => {
                  console.log("button clicked");
                  await getWatching().then((watching) => {
                    setBottomRow(watching);
                    console.log("bottom row set: ", bottomRow);
                  });
                }}
                className={styles.selectItem}
              >
                Continue Watching
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.bottomRowContainer}>
          <div className={styles.bottomRowMovie}>
            {bottomRow ? (
              <div>
                <BottomRowOverlay movie={bottomRow[0]} movieIndex={1} />
                <MoviePoster movie={bottomRow[0]}  />
              </div>
            ) : (
              <div className={styles.loadingAnimation}></div>
            )}
          </div>
          <div className={styles.bottomRowMovie}>
          {bottomRow ? (
              <div>
                <BottomRowOverlay movie={bottomRow[1]} movieIndex={2} />
                <MoviePoster movie={bottomRow[1]}  />
              </div>
            ) : (
              <div className={styles.loadingAnimation}></div>
            )}
          </div>
          <div className={styles.bottomRowMovie}>
          {bottomRow ? (
              <div>
                <BottomRowOverlay movie={bottomRow[2]} movieIndex={3} />
                <MoviePoster movie={bottomRow[2]}  />
              </div>
            ) : (
              <div className={styles.loadingAnimation}></div>
            )}
          </div>
          <div className={styles.bottomRowMovie}>
          {bottomRow ? (
              <div>
                <BottomRowOverlay movie={bottomRow[3]} movieIndex={4} />
                <MoviePoster movie={bottomRow[3]}  />
              </div>
            ) : (
              <div className={styles.loadingAnimation}></div>
            )}
          </div>
          <div className={styles.bottomRowMovie}>
          {bottomRow ? (
              <div>
                <BottomRowOverlay movie={bottomRow[4]} movieIndex={5} />
                <MoviePoster movie={bottomRow[4]}  />
              </div>
            ) : (
              <div className={styles.loadingAnimation}></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  headings: "font-bold text-[1.3vw] w-[15vw]",
  skeleton: "h-full w-full rounded-xl",
  largeTopPick: "relative h-[40vh] w-[50vw] rounded-xl hover:scale-[1.02] transition ease-in-out hover:cursor-pointer",
  smallTopPick: "relative h-[19vh] w-[20vw] rounded-xl hover:scale-105 transition ease-in-out hover:cursor-pointer",
  loadingAnimation:
    "w-full h-full bg-loading rounded-xl animate-pulse duration-500",
  bottomRowContainer: "w-full flex flex-row space-x-[2vh]",
  bottomRowMovie: "relative w-[20vw] h-[30vh] rounded-xl hover:scale-105 transition ease-in-out hover:cursor-pointer",
  imageProperties: "rounded-xl opacity-40 z-10",
  selectItem: "hover:cursor-pointer hover:bg-loading/10",
};
