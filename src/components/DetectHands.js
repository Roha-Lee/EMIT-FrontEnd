import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";
// import { drawHand } from "./HandDraw";
import {useRef} from "react";

function DetectHands(){
    const webcamRef = useRef(null);
    // const canvasRef = useRef(null);

    const runHandpose = async () => {
        const net = await handpose.createDetector(handpose.SupportedModels.MediaPipeHands,{runtime : "tfjs"});
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval( async () => {
            const ifHand  =  await detect(net);
            // console.log(ifHand);
                        
            const element = document.getElementById('moveDetect');
            if(ifHand === true && ifHand !== undefined){
                element.innerText = "Hand Detected";
            }
            else if (ifHand === false && ifHand !== undefined){
                element.innerText = "No Hand Detected";
            }
        }, 1000);
    };

    const detect = async (net) => {
        
        // Check data is available
        if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            // canvasRef.current.width = videoWidth;
            // canvasRef.current.height = videoHeight;

            // Make Detections
            const hand = await net.estimateHands(video);
            // console.log(hand);
            
            return hand.length > 0;

        }
    };

    // useEffect(runHandpose,[]);
    runHandpose();

    return (
        <div>
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

            {/* <canvas
            ref={canvasRef}
            style={
                {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                }
            }
            /> */}
        </div>
    );
}


export default DetectHands