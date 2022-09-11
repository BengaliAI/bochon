import { Box, Center } from "@chakra-ui/react";
import { useState } from "react";
import { TextAreaTTS } from "../components/textAreaTTS";
import { ToolBoxTTS } from "../components/toolboxTTS";

export const TTS = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const synthesize = () => {
    setIsLoading(true);
    // azureController.synthesize(text, () => setIsLoading(false));
    setIsLoading(false);
  };

  return (
    <Center w="100%" flexDir="column" height="100%" mx="auto">
      <Box flexGrow={1} p={[5, 8, 10, 10]} pb={[0, 0, 0, 0]} width="100%">
        <TextAreaTTS text={text} setText={setText} />
      </Box>
      <Box p={5}>
        <ToolBoxTTS
          synthesize={synthesize}
          text={text}
          isLoading={isLoading}
          clearText={() => setText("")}
        />
      </Box>
    </Center>
  );
};
