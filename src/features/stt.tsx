import { Button, Center, Heading, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import RecordRTC from "recordrtc";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.REACT_APP_AZURE_SECRET_KEY || "",
  process.env.REACT_APP_AZURE_REGION || ""
);
speechConfig.speechRecognitionLanguage = "en-US";

export const STT = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [recognizingText, setRecognizingText] = useState("");
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [recognizer, setRecognizer] = useState<sdk.SpeechRecognizer | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setRecordedAudio(null);
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const audioConfig = sdk.AudioConfig.fromStreamInput(audioStream);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.startContinuousRecognitionAsync();

    recognizer.recognized = (s, e) => {
      console.log("recognized", e);
      if (e.result.text) {
        setRecognizingText("");
        setRecognizedText((prev) => prev + " " + e.result.text);
      }
    };

    recognizer.recognizing = (s, e) => {
      console.log("recognizing", e);
      if (e.result.text) {
        setRecognizingText(e.result.text);
      }
    };

    const audioRecorder = new RecordRTC(audioStream, {
      type: "audio",
    });
    audioRecorder.startRecording();
    setIsRecording(true);
    setRecognizer(recognizer);
    setRecorder(audioRecorder);
  };

  const stopRecording = async () => {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
    }
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
      });
    }
    setIsRecording(false);
  };

  return (
    <Center w="100%" flexDir="column" p={5} maxW={800} mx="auto">
      <Heading size="xl" mb={3}>
        STT
      </Heading>
      <Textarea
        placeholder="Text will appear here..."
        value={
          recognizedText || recognizingText
            ? recognizedText + " " + recognizingText
            : ""
        }
        readOnly
      />
      <Stack direction="row" spacing={4} mt={3}>
        <Button
          colorScheme="green"
          variant="solid"
          size="lg"
          onClick={startRecording}
          isLoading={isRecording}
        >
          Start
        </Button>
        {isRecording && (
          <Button
            colorScheme="red"
            variant="solid"
            size="lg"
            onClick={stopRecording}
          >
            Stop
          </Button>
        )}

        {recordedAudio && (
          <audio controls src={URL.createObjectURL(recordedAudio)}></audio>
        )}
      </Stack>
    </Center>
  );
};
