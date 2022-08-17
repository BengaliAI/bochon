import { Box, Center } from "@chakra-ui/react";
import { UploadArea } from "../components/uploadArea";

const ModelUploadPage = () => {
  return (
    <Center w="100%" flexDir="column" height="100%" mx="auto">
      <Box flexGrow={1} p={[5, 8, 10, 10]} pb={[0, 0, 0, 0]} width="100%">
        <UploadArea />
      </Box>
      <Box p={5}>
        {/* <ToolBoxSTT
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
        /> */}
      </Box>
    </Center>
  );
};

export default ModelUploadPage;
