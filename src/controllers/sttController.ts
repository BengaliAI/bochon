import hark from "hark";
import { RecordRTCPromisesHandler } from "recordrtc";
import { ConnectionController } from "./connectionController";

class STTController {
  private audioStream: MediaStream | null = null;
  private recorder: RecordRTCPromisesHandler | null = null;
  private speechEvents: hark.Harker | null = null;
  private controllers: ConnectionController[] = [];

  public start = async (
    onRecognize: (message: string) => void,
    setIsSpeaking?: (isSpeaking: boolean) => void
  ) => {
    this.controllers.forEach((controller) => {
      controller.setRecognizedCallback(onRecognize);
    });
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
      this.controllers.forEach((controller) => controller.sendData(blob));
      await this.recorder?.reset();
      this.recorder?.startRecording();
    });
  };

  public stop = () => {
    this.speechEvents?.stop();
    this.audioStream?.getAudioTracks()[0].stop();
  };

  public fromAudioFile = (file: File) => {
    const promises = this.controllers.map((controller) => {
      return new Promise<string>((resolve) => {
        controller.setRecognizedCallback(resolve);
        controller.sendData(file);
      });
    });

    return promises;
  };
}

const sttController = new STTController();
export default sttController;
