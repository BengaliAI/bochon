import { Button, Center, Heading, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import azureController from "../controllers/azureController";

export const TTS = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const synthesize = async () => {
    setIsLoading(true);
    await azureController.synthesize(text);
    setIsLoading(false);
  };

  return (
    <Center w="100%" flexDir="column" p={5} maxW={800} mx="auto">
      <Heading size="xl" mb={3}>
        TTS
      </Heading>
      <Textarea
        placeholder="Write desired text here..."
        value={text}
        onChange={(e: any) => setText(e.target.value)}
      />
      <Stack direction="row" spacing={4} mt={3}>
        <Button
          colorScheme="green"
          variant="solid"
          size="lg"
          onClick={synthesize}
          isLoading={isLoading}
        >
          Synthesize
        </Button>
      </Stack>
    </Center>
  );
};
