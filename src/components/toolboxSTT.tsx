import { Center, Flex, Icon, keyframes, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  RiUploadLine,
  RiFileCopyLine,
  RiCloseLine,
  RiMicOffLine,
  RiMicLine,
  RiQuestionMark,
} from "react-icons/ri";

type ToolBoxSTTProps = {
  isRecording: boolean;
  text: string;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearText: () => void;
};

const animationKeyFrame = keyframes`
    0% { opacity: 1 } 
    50% { opacity: 0.6 } 
    100% { opacity: 1 }
`;

const animation = `${animationKeyFrame} 2s ease-in-out infinite`;

export const ToolBoxSTT = ({
  isRecording,
  text,
  startRecording,
  stopRecording,
  clearText,
}: ToolBoxSTTProps) => {
  const handleRecordClick = async () => {
    if (isRecording) stopRecording();
    else await startRecording();
  };

  const toast = useToast();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Text copied to clipboard",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
      variant: "subtle",
      status: "success",
    });
  };

  return (
    <Flex
      borderRadius="xl"
      fontSize={["md", "lg", "xl"]}
      overflow="hidden"
      shadow="sm"
      sx={{
        "&>div": {
          py: [3, 3, 5],
          px: [5, 5, 10],
          borderRight: "1px solid #ddd",
          cursor: "pointer",
          transition: "background 0.3s ease",
          _hover: { background: "#fff8" },
        },
        "&>div:not(.record-button)": {
          background: "white",
          _hover: { background: "#fff8" },
        },
        "&>div:last-child": {
          border: "none",
        },
      }}
    >
      <Center
        as={motion.div}
        animation={isRecording ? animation : ""}
        background={isRecording ? "red.300 !important" : "white"}
        className="record-button"
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onClick={handleRecordClick}
      >
        <Icon as={isRecording ? RiMicOffLine : RiMicLine} />
      </Center>
      <Center title="Upload Audio">
        <Icon as={RiUploadLine} />
      </Center>
      {text && (
        <Center onClick={copyToClipboard} title="Copy to Clipboard">
          <Icon as={RiFileCopyLine} />
        </Center>
      )}
      <Center title="Help">
        <Icon as={RiQuestionMark} />
      </Center>
      {text && (
        <Center onClick={clearText} title="Clear">
          <Icon as={RiCloseLine} />
        </Center>
      )}
    </Flex>
  );
};
