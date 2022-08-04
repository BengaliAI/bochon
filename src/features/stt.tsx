import { Button, Center, Heading, Stack, Textarea } from "@chakra-ui/react";
import { useCallback, useState } from "react";
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
      </Stack>
    </Center>
  );
};
