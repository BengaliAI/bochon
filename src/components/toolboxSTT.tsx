import { Box, keyframes, useToast } from "@chakra-ui/react";
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
import { useRef } from "react";
import { useTranslation } from "react-i18next";

type ToolBoxSTTProps = {
  isRecording: boolean;
  text: string;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearText: () => void;
  fromAudioFile: (audioFile: File) => Promise<void>;
  fromFileLoading: boolean;
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
  fromAudioFile,
  fromFileLoading,
}: ToolBoxSTTProps) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleRecordClick = async () => {
    if (isRecording) stopRecording();
    else await startRecording();
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      title: t("textCopied"),
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
      variant: "subtle",
      status: "success",
    });
  };

  return (
    <>
      <ToolBoxContainer>
        {!fromFileLoading && (
          <ToolBoxItem
            as={motion.div}
            animation={isRecording ? animation : ""}
            background={isRecording ? "red.300 !important" : "white"}
            className="record-button"
            title={isRecording ? t("stopRecording") : t("startRecording")}
            onClick={handleRecordClick}
            icon={isRecording ? RiMicOffLine : RiMicLine}
          />
        )}
        {!isRecording && (
          <ToolBoxItem
            title={t("uploadAudio")}
            icon={RiUploadLine}
            onClick={() => {
              !fromFileLoading && fileInputRef.current?.click();
            }}
            isLoading={fromFileLoading}
          />
        )}
        {text && (
          <ToolBoxItem
            onClick={copyToClipboard}
            title={t("copyToClipboard")}
            icon={RiFileCopyLine}
          />
        )}
        <ToolBoxItem title={t("help")} icon={RiQuestionMark} />
        {text && (
          <ToolBoxItem
            onClick={clearText}
            title={t("clear")}
            icon={RiCloseLine}
          />
        )}
      </ToolBoxContainer>
      <Box
        as="input"
        type="file"
        display="none"
        visibility="hidden"
        ref={fileInputRef}
        accept="audio/*"
        multiple={false}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.files?.[0] && (await fromAudioFile(e.target.files[0]));
        }}
      />
    </>
  );
};
