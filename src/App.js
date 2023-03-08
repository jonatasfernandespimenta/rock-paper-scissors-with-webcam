import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { drawHand, gameResult, play_options } from "./utils/helpers";
import * as fp from "fingerpose";
import rockGestureDescription from "./utils/customGestures/rock";
import paperGestureDescription from "./utils/customGestures/paper";
import scissorsDescription from "./utils/customGestures/scissors";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [playerInput, setPlayerInput] = useState(null);
  const [computerInput, setComputerInput] = useState(null);
  const [result, setResult] = useState();

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
    setComputerInput('');

    const random = Math.floor(Math.random() * play_options.length);
    const cpInput = play_options[random];

    setComputerInput(cpInput)
    setResult(gameResult(cpInput, playerInput))
  }

  useEffect(() => {
    runHandPose();
  }, []);

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
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
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
          background: 'black'
        }}
      />

      <h1
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 400,
          bottom: 500,
          right: 0,
          textAlign: "center",
          height: 100,
          color: 'white'
        }}
      >
        {result}
      </h1>

      <button style={{ marginTop: '700px', width: '50px' }} onClick={play}>Play</button>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Computador: {computerInput}</p>
        <p>Resultado: {result}</p>
      </div>
    </div>
  );
}

export default App;
