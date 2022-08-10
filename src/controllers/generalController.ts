import hark from "hark";
import { RecordRTCPromisesHandler } from "recordrtc";

class GeneralController {
  private audioStream: MediaStream | null = null;
  private recorder: RecordRTCPromisesHandler | null = null;
  private maxSeconds = 3;
  private speechEvents: hark.Harker | null = null;

  public start = async () => {
    this.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.recorder = new RecordRTCPromisesHandler(this.audioStream, {
      type: "audio",
      mimeType: "audio/wav",
      disableLogs: true,
    });

    this.speechEvents = hark(this.audioStream, {});

    this.speechEvents.on("speaking", async () => {
      await this.recorder?.startRecording();
      console.log("Speaking");
    });

    this.speechEvents.on("stopped_speaking", async () => {
      await this.recorder?.stopRecording();
      console.log("Stopped Speaking", await this.recorder?.getBlob());
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
