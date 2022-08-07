import { Box, Center } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { TextAreaSTT } from "../components/textareaSTT";
import { ToolBoxSTT } from "../components/toolboxSTT";
import azureController, {
  AzureCallbackType,
} from "../controllers/azureController";

export const STT = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [recognizingText, setRecognizingText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const recognizedCB: AzureCallbackType = useCallback((s, e) => {
    if (e.result.text) {
      setRecognizingText("");
      setRecognizedText((prev) => prev + " " + e.result.text);
    }
  }, []);

  const recognizingCB: AzureCallbackType = useCallback((s, e) => {
    if (e.result.text) setRecognizingText(e.result.text);
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    await azureController.start(recognizedCB, recognizingCB);
  };

  const stopRecording = () => {
    azureController.stop();
    setRecognizingText("");
    setIsRecording(false);
  };

  return (
    <Center w="100%" flexDir="column" height="100vh" mx="auto">
      <Box flexGrow={1} p={[5, 8, 10, 10]} pb={[0, 0, 0, 0]} width="100%">
        <TextAreaSTT
          recognizedText={recognizedText}
          recognizingText={recognizingText}
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
        />
      </Box>
    </Center>
  );
};
