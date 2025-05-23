"use client";
import Image from "next/image";
import HandRecognizer from "./components/HandRecognizer";
import RocketComponent from "./components/RocketComponent";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BoulderComponent from "./components/BoulderComponent";
import GameInfoOverlay from "./components/GameInfoOverlay";
import { playBackgroundMusic, playFX } from "../../utils/audiohandler";

let generationInterval: any;
let removeInterval: any;
let distanceInterval: any;
let livesRemaining: number;

export default function Home() {
  const [rocketLeft, setRocketLeft] = useState(0);
  const [isDetected, setIsDetected] = useState(false);
  const [degrees, setDegrees] = useState(0);
  const [boulders, setBoulders] = useState<any[]>([]);
  const [detectCollisionTrigger, setDetectCollisionTrigger] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isColliding, setIsColliding] = useState(false);
  const [distance, setDistance] = useState(0);
  const [LivesRemainingState, setLivesRemainingState] = useState(0);
  const [isGameOver, setisGameOver] = useState(false);
  const [invincible, setInvincible] = useState(false);

  const rocketRef = useRef<HTMLDivElement | null>(null); // Explicitly typing the ref
  const [rocket, setRocket] = useState<any>();

  useEffect(() => {
    setRocketLeft(window.innerWidth / 2);
    livesRemaining = 4;
    setLivesRemainingState(livesRemaining);
  }, []);

  useEffect(() => {
    if (isDetected && !isGameOver) {
      distanceInterval = setInterval(() => {
        setDistance((prev) => prev + 1);
      }, 100);
    }

    return () => {
      clearInterval(distanceInterval);
    };
  }, [isDetected, isGameOver]);

  useEffect(() => {
    if (isDetected && !isGameOver) {
      generationInterval = setInterval(() => {
        setBoulders((prevArr) => {
          const now = Date.now();
          return [
            ...prevArr,
            {
              timeStamp: now,
              key: `${now}`,
            },
          ];
        });
      }, 1000);

      removeInterval = setInterval(() => {
        const now = Date.now();
        setBoulders((prevArr) => {
          return prevArr.filter((b) => now - b.timeStamp < 5000);
        });
      }, 5000);

      return () => {
        clearInterval(generationInterval);
        clearInterval(removeInterval);
      };
    }
  }, [isDetected, isGameOver]);

  const setHandResults = (result: any) => {
    setIsLoading(result.isLoading);
    setIsDetected(result.isDetected);
    setDegrees(result.degrees);

    if (result.degrees && result.degrees !== 0) {
      setDetectCollisionTrigger(Math.random());
      setRocketLeft((prev) => {
        const ret = prev - result.degrees / 6;
        if (ret < 20) {
          return prev;
        }
        if (ret > window.innerWidth - 52) {
          return prev;
        }
        return ret;
      });
    }

    // Check if rocketRef.current exists before calling getBoundingClientRect()
    if (rocketRef.current) {
      setRocket(rocketRef.current.getBoundingClientRect());
    }
  };

  const collisionHandler = () => {
    if (!invincible && !isGameOver) {
      console.log("Collision");
      setInvincible(true);
      setIsColliding(true);
      playFX();
      livesRemaining--;
      setLivesRemainingState(livesRemaining);
      if (livesRemaining <= 0) {
        setisGameOver(true);
      }

      setTimeout(() => {
        setInvincible(false);
        setIsColliding(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (isGameOver) {
      playBackgroundMusic(true);
    } else if (isDetected) {
      playBackgroundMusic(false);
    } else {
      playBackgroundMusic(true);
    }
  }, [isDetected, isGameOver]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div
        className={`absolute left-3 top-3 z-30 transition-all duration-500 ${
          isDetected ? "w-24" : "w-48"
        }`}
      >
        <HandRecognizer setHandResults={setHandResults} />
      </div>
      <div
        ref={rocketRef}
        id="rocket-container"
        style={{
          position: "absolute",
          left: rocketLeft,
          transition: "all",
          animationDuration: "10ms",
          marginTop: "500px",
        }}
      >
        <RocketComponent degrees={degrees} />
      </div>
      <div className="absolute z-10 h-screen w-screen overflow-hidden">
        {boulders.map((b) => {
          return (
            <BoulderComponent
              key={b.key}
              isMoving={isDetected}
              what={rocket}
              soWhat={collisionHandler}
              when={detectCollisionTrigger}
            />
          );
        })}
      </div>

      <GameInfoOverlay
        info={{
          isLoading,
          distance,
          isColliding,
          isDetected,
          livesRemaining,
          isGameOver,
          LivesRemainingState,
        }}
      />
    </main>
  );
}
