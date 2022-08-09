import { Box, Icon, Text, Center } from "@chakra-ui/react";
import { RiMic2Line, RiMicLine, RiUploadLine } from "react-icons/ri";
import { TextAreaContainer } from "./textarea";

type TextAreaSTTProps = {
  recognizedText: string;
  recognizingText: string;
  isRecording: boolean;
};

const models = [{ name: "Microsoft Azure", value: "azure" }];

export const TextAreaSTT = ({
  recognizedText,
  recognizingText,
  isRecording,
}: TextAreaSTTProps) => {
  return (
    <TextAreaContainer icon={RiMic2Line} title="Speech to Text" models={models}>
      <Box fontSize="lg" height="100%" flexGrow={1} px={10} py={5}>
        {!recognizedText &&
          !recognizingText &&
          (isRecording ? (
            <Text display="inline" color="gray.500">
              Listening...
            </Text>
          ) : (
            <Center
              height="100%"
              width="100%"
              textAlign="center"
              pb={5}
              flexDir="column"
              color="gray.500"
              fontSize={["md", "lg", "xl"]}
              flexWrap="wrap"
            >
              <Text display="flex" alignItems="center">
                Click <Icon as={RiMicLine} mx={2} /> to start live transcribing
              </Text>

              <Text display="flex" alignItems="center">
                Click <Icon as={RiUploadLine} mx={2} /> to upload audio file
              </Text>
            </Center>
          ))}

        {recognizedText && <Text display="inline">{recognizedText} </Text>}
        {recognizingText && (
          <Text display="inline" color="gray.500">
            {recognizingText}
          </Text>
        )}
      </Box>
    </TextAreaContainer>
  );
};
