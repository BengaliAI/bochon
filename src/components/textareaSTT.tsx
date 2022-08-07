import { Select, Flex, Icon, Box, Text } from "@chakra-ui/react";
import { RiMic2Line } from "react-icons/ri";

type TextAreaSTTProps = {
  recognizedText: string;
  recognizingText: string;
};

export const TextAreaSTT = ({
  recognizedText,
  recognizingText,
}: TextAreaSTTProps) => {
  return (
    <Flex
      direction="column"
      bg="#fff5"
      borderRadius="xl"
      shadow="xl"
      height="100%"
    >
      <Flex
        py={3}
        px={5}
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #ddd"
        flexShrink={1}
      >
        <Flex fontSize={20} alignItems="center">
          <Icon as={RiMic2Line} me={3} fontSize={25} />
          <span>Speech To Text</span>
        </Flex>
        <Select placeholder="Select Model" width="50%">
          <option value="azure">Microsoft Azure</option>
          <option value="gcp">Google Cloud</option>
          <option value="aws">Amazon AWS</option>
        </Select>
      </Flex>
      <Box
        fontSize={18}
        bg="transparent"
        border="none"
        height="100%"
        flexGrow={1}
        px={10}
        py={5}
      >
        {recognizedText && <Text display="inline">{recognizedText} </Text>}
        {recognizingText && (
          <Text display="inline" color="gray.500">
            {recognizingText}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
