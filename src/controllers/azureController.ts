import {
  AudioConfig,
  Recognizer,
  SpeechConfig,
  SpeechRecognitionEventArgs,
  SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";

export type AzureCallbackType = (
  sender: Recognizer,
  event: SpeechRecognitionEventArgs
) => void;

class AzureController {
  private audioStream: MediaStream | null = null;
  private speechConfig: SpeechConfig | null = null;
  private audioConfig: AudioConfig | null = null;
  private speechRecognizer: SpeechRecognizer | null = null;

  constructor() {
    this.speechConfig = SpeechConfig.fromSubscription(
      process.env.REACT_APP_AZURE_SECRET_KEY || "",
      process.env.REACT_APP_AZURE_REGION || ""
    );
    this.speechConfig.speechRecognitionLanguage = "en-US";
  }

  public start = async (
    recognizedCallback: AzureCallbackType,
    recognizingCallback: AzureCallbackType
  ) => {
    if (!this.speechConfig) return;
    this.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.audioConfig = AudioConfig.fromStreamInput(this.audioStream);
    this.speechRecognizer = new SpeechRecognizer(
      this.speechConfig,
      this.audioConfig
    );
    this.speechRecognizer.startContinuousRecognitionAsync();
    this.speechRecognizer.recognized = recognizedCallback;
    this.speechRecognizer.recognizing = recognizingCallback;
  };

  public stop = () => {
    if (!this.speechRecognizer) return;
    this.speechRecognizer.stopContinuousRecognitionAsync();
    this.speechRecognizer.close();
    this.audioStream?.getAudioTracks()[0].stop();
  };
}

const azureController = new AzureController();
export default azureController;
