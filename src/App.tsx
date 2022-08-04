import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { STT } from "./features/stt";
import { TTS } from "./features/tts";

function App() {
  return (
    <Box>
      <Heading size="2xl" textAlign="center" color="primary.red">
        Hello STT-TTS
      </Heading>
      <STT />
      <TTS />
    </Box>
  );
}

export default App;
