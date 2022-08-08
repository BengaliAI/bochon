import { keyframes, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  RiUploadLine,
  RiFileCopyLine,
  RiCloseLine,
  RiMicOffLine,
  RiMicLine,
  RiQuestionMark,
} from "react-icons/ri";
import { ToolBoxContainer, ToolBoxItem } from "./toolbox";

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
  const toast = useToast();

  const handleRecordClick = async () => {
    if (isRecording) stopRecording();
    else await startRecording();
  };

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
    <ToolBoxContainer>
      <ToolBoxItem
        as={motion.div}
        animation={isRecording ? animation : ""}
        background={isRecording ? "red.300 !important" : "white"}
        className="record-button"
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onClick={handleRecordClick}
        icon={isRecording ? RiMicOffLine : RiMicLine}
      />
      {!isRecording && <ToolBoxItem title="Upload Audio" icon={RiUploadLine} />}
      {text && (
        <ToolBoxItem
          onClick={copyToClipboard}
          title="Copy to Clipboard"
          icon={RiFileCopyLine}
        />
      )}
      <ToolBoxItem title="Help" icon={RiQuestionMark} />
      {text && (
        <ToolBoxItem onClick={clearText} title="Clear" icon={RiCloseLine} />
      )}
    </ToolBoxContainer>
  );
};