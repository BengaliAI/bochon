import {
  AudioConfig,
  Recognizer,
  SpeechConfig,
  SpeechRecognitionEventArgs,
  SpeechRecognizer,
  SpeechSynthesizer,
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
  private synthesizer: SpeechSynthesizer | null = null;
  private synthesizerAudioConfig: AudioConfig | null = null;

  constructor() {
    this.speechConfig = SpeechConfig.fromSubscription(
      process.env.REACT_APP_AZURE_SECRET_KEY || "",
      process.env.REACT_APP_AZURE_REGION || ""
    );
    this.speechConfig.speechRecognitionLanguage = "en-US";
    this.speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
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

  public synthesize = (text: string, callback: () => void) => {
    if (!this.speechConfig) return;
    this.synthesizerAudioConfig = AudioConfig.fromDefaultSpeakerOutput();
    this.synthesizer = new SpeechSynthesizer(
      this.speechConfig,
      this.synthesizerAudioConfig
    );
    this.synthesizer.speakTextAsync(text, callback);
  };
}

const azureController = new AzureController();
export default azureController;
