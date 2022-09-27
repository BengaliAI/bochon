import hark from "hark";
import { RecordRTCPromisesHandler } from "recordrtc";
import connectionController from "./connectionController";

class STTController {
  private audioStream: MediaStream | null = null;
  private recorder: RecordRTCPromisesHandler | null = null;
  private speechEvents: hark.Harker | null = null;

  public start = async (
    onRecognize: (message: string) => void,
    setIsSpeaking?: (isSpeaking: boolean) => void
  ) => {
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
    this.recorder?.startRecording();
    setIsSpeaking?.(false);

    this.speechEvents.on("speaking", () => {
      setIsSpeaking?.(true);
      console.log("Speaking");
    });

    this.speechEvents.on("stopped_speaking", async () => {
      setIsSpeaking?.(false);
      console.log("Stopped speaking");
      await this.recorder?.stopRecording();
      const blob = await this.recorder?.getBlob();
      console.log(blob);
      connectionController.sendData(blob);
      await this.recorder?.reset();
      this.recorder?.startRecording();
    });
  };

  public stop = () => {
    this.speechEvents?.stop();
    this.audioStream?.getAudioTracks()[0].stop();
  };

  public fromAudioFile = (file: File) => {
    return new Promise<string>((resolve) => {
      connectionController.setRecognizedCallback((message) => {
        resolve(message);
      });
      connectionController.sendData(file);
    });
  };
}

const sttController = new STTController();
export default sttController;
