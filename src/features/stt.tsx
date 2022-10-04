import { Box, Center } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { TextAreaSTT } from "../components/textareaSTT";
import { ToolBoxSTT } from "../components/toolboxSTT";
import sttController from "../controllers/sttController";

export const STT = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [recognizingText, setRecognizingText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [fromFileLoading, setFromFileLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const onRecognize = useCallback((message: string) => {
    setRecognizedText((prev) => prev + " " + message);
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    await sttController.start(onRecognize, setIsSpeaking);
  };

  const stopRecording = () => {
    sttController.stop();
    setRecognizingText("");
    setIsRecording(false);
  };

  const fromAudioFile = useCallback(async (audioFile: File) => {
    if (!audioFile) return;
    setFromFileLoading(true);
    const message = await sttController.fromAudioFile(audioFile);
    setRecognizedText(message);
    setFromFileLoading(false);
  }, []);

  return (
    <Center
      w="100%"
      height="100vh"
      // overflow="scroll"
      flexDir="column"
      mx="auto"
    >
      <Box
        flexGrow={1}
        p={[5, 8, 10, 10]}
        pb={[0, 0, 0, 0]}
        display="flex"
        flexDir="column"
        width="100%"
        // height="100%"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <TextAreaSTT
          recognizedText={recognizedText}
          recognizingText={recognizingText}
          isRecording={isRecording}
          isSpeaking={isSpeaking}
        />
        <TextAreaSTT
          recognizedText={recognizedText}
          recognizingText={recognizingText}
          isRecording={isRecording}
          isSpeaking={isSpeaking}
        />
        <TextAreaSTT
          recognizedText={recognizedText}
          recognizingText={recognizingText}
          isRecording={isRecording}
          isSpeaking={isSpeaking}
        />
      </Box>
      <Box p={5}>
        <ToolBoxSTT
          isRecording={isRecording}
          text={(recognizedText && recognizedText + " ") + recognizingText}
          startRecording={startRecording}
          stopRecording={stopRecording}
          clearText={() => {
            setRecognizedText("");
            setRecognizingText("");
          }}
          fromAudioFile={fromAudioFile}
          fromFileLoading={fromFileLoading}
        />
      </Box>
    </Center>
  );
};
