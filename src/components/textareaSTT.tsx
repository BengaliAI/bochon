import { Box, Text } from "@chakra-ui/react";
import { RiMic2Line } from "react-icons/ri";
import { TextAreaContainer } from "./textarea";

type TextAreaSTTProps = {
  recognizedText: string;
  recognizingText: string;
};

const models = [{ name: "Microsoft Azure", value: "azure" }];

export const TextAreaSTT = ({
  recognizedText,
  recognizingText,
}: TextAreaSTTProps) => {
  return (
    <TextAreaContainer icon={RiMic2Line} title="Speech to Text" models={models}>
      <Box fontSize="lg" height="100%" flexGrow={1} px={10} py={5}>
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
