import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { TextAreaBox } from "../components/textareaBox";
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
    azureController.start(recognizedCB, recognizingCB);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    azureController.stop();
    setIsRecording(false);
  };

  return (
    <Center w="100%" flexDir="column" height="100vh" mx="auto">
      <Box flexGrow={1} p={[5, 8, 10, 10]} pb={[0, 0, 0, 0]} width="100%">
        <TextAreaBox />
      </Box>

      {/* <Textarea
        placeholder="Text will appear here..."
        value={
          recognizedText || recognizingText
            ? recognizedText + " " + recognizingText
            : ""
        }
        readOnly
      /> */}
      <Stack direction="row" spacing={4} p={5} flexShrink={1}>
        <Button
          colorScheme="orange"
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
      </Stack>
    </Center>
  );
};
