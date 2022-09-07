import hark from "hark";
import { RecordRTCPromisesHandler } from "recordrtc";
import connectionController from "./connectionController";

class GeneralController {
  private audioStream: MediaStream | null = null;
  private recorder: RecordRTCPromisesHandler | null = null;
  private maxSeconds = 3;
  private speechEvents: hark.Harker | null = null;

  public start = async (onRecognize: (message: string) => void) => {
    connectionController.setRecognizedCallback(onRecognize);
    this.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.recorder = new RecordRTCPromisesHandler(this.audioStream, {
      type: "audio",
      mimeType: "audio/wav",
      disableLogs: true,
    });

    this.speechEvents = hark(this.audioStream, {});

    this.speechEvents.on("speaking", () => {
      console.log("Speaking");
      this.recorder?.startRecording();
    });

    this.speechEvents.on("stopped_speaking", async () => {
      console.log("Stopped speaking");
      await this.recorder?.stopRecording();
      const blob = await this.recorder?.getBlob();
      console.log(blob);
      connectionController.sendMessage("Data sent");
      connectionController.sendData(blob);
      await this.recorder?.reset();
    });
  };

  public stop = () => {
    this.speechEvents?.stop();
    this.audioStream?.getAudioTracks()[0].stop();
  };
}

const generalController = new GeneralController();
export default generalController;
