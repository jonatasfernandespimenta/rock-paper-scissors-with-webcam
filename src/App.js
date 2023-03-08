import "./App.css";
import Lottie from "lottie-react";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { drawHand, gameResult, play_options } from "./utils/helpers";
import * as fp from "fingerpose";
import rockGestureDescription from "./utils/customGestures/rock";
import paperGestureDescription from "./utils/customGestures/paper";
import scissorsDescription from "./utils/customGestures/scissors";

import loadingAnimation from "./assets/loading.json";
import wonAnimation from "./assets/win.json";
import loseAnimation from "./assets/lose.json";
import tieAnimation from "./assets/tie.json";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [playerInput, setPlayerInput] = useState(null);
  const [computerInput, setComputerInput] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runHandPose = async () => {
    const net = await handpose.load();
    console.log("handpose model loaded!");

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = 640;
      const videoHeight = 480;

      webcamRef.current.video.width = 640;
      webcamRef.current.video.height = 480;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          scissorsDescription,
          rockGestureDescription,
          paperGestureDescription,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          setPlayerInput(gesture.gestures[maxConfidence].name);
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  function play() {
    setComputerInput("");
    setLoading(true);

    const random = Math.floor(Math.random() * play_options.length);
    const cpInput = play_options[random];

    setComputerInput(cpInput);

    setTimeout(() => {
      setResult(gameResult(cpInput, playerInput));
    }, 2600);
  }

  useEffect(() => {
    runHandPose();
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    if (result !== "") {
      setTimeout(() => {
        setResult("");
      }, 2000);
    }
  }, [result]);

  return (
    <>
      {loading ? (
        <div
          style={{
            background: "#00000040",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 20,
          }}
        >
          <Lottie
            animationData={loadingAnimation}
            autoPlay
            speed={1}
            loop={false}
          />
        </div>
      ) : null}

      {result === "won" ? (
        <div className="lottie">
          <Lottie
            animationData={wonAnimation}
            autoPlay
            speed={1}
            loop={false}
            style={{ width: 300 }}
          />
        </div>
      ) : null}

      {result === "tie" ? (
        <div className="lottie">
          <Lottie
            animationData={tieAnimation}
            autoPlay
            speed={1}
            loop={false}
          />
        </div>
      ) : null}

      {result === "lose" ? (
        <div className="lottie">
          <Lottie
            animationData={loseAnimation}
            autoPlay
            speed={1}
            loop={false}
            style={{
              width: 150
            }}
          />
        </div>
      ) : null}

      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            marginTop: 60,
          }}
        >
          <div
            style={{
              zIndex: 10,
              borderRadius: 300,
              background: "#f9ae1c",
              width: 120,
              height: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "700px",
              marginTop: "-60px",
              position: "absolute",
            }}
          >
            <img src="/user_pfp.png" width={100} />
          </div>

          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 20,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 20,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
              background: "#fcbc3f",
            }}
          />

          <div
            style={{
              zIndex: 10,
              borderRadius: 300,
              background: "#bf5842",
              width: 120,
              height: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "700px",
              marginTop: "-60px",
            }}
          >
            <img src="/bot_pfp.png" width={100} />
          </div>
          <div
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              right: 20,
              display: "flex",
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
              justifyContent: "center",
              alignItems: "center",
              background: "#bf7262",
            }}
          >
            {computerInput && !loading ? (
              <img src={`/${computerInput}.png`} />
            ) : null}
          </div>
        </div>

        <button style={{ marginTop: "430px" }} onClick={play}>
          Play
        </button>
      </div>
    </>
  );
}

export default App;
