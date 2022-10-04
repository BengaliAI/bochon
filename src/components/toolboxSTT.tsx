import { Box, keyframes, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  RiUploadLine,
  RiFileCopyLine,
  RiCloseLine,
  RiMicOffLine,
  RiMicLine,
  RiQuestionMark,
  RiAddLine,
  RiSubtractLine,
} from "react-icons/ri";
import { ToolBoxContainer, ToolBoxItem } from "./toolbox";
import { Dispatch, SetStateAction, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ConnectionController } from "../controllers/connectionController";
import { STTModels } from "../config/models";
import { LocalStorageHandler } from "../utils/localstorageHandler";

type ToolBoxSTTProps = {
  isRecording: boolean;
  text: string;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearText: () => void;
  fromAudioFile: (audioFile: File) => Promise<void>;
  fromFileLoading: boolean;
  controllers: ConnectionController[];
  setControllers: Dispatch<SetStateAction<ConnectionController[]>>;
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
  controllers,
  setControllers,
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

  const addModel = () => {
    if (controllers.length >= 3) return;
    const newController = new ConnectionController();
    const modelIndex = LocalStorageHandler.getSTTModelIndex();
    newController.connect(
      STTModels[modelIndex].url,
      STTModels[modelIndex].path
    );
    setControllers((prevControllers: ConnectionController[]) => [
      ...prevControllers,
      newController,
    ]);
  };

  const removeModel = () => {
    if (controllers.length <= 1) return;
    setControllers((prevControllers: ConnectionController[]) => {
      const newControllers = [...prevControllers];
      newControllers.pop();
      return newControllers;
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
        {!isRecording && (
          <>
            {controllers.length < 3 && (
              <ToolBoxItem
                title={t("addModel")}
                icon={RiAddLine}
                onClick={addModel}
              />
            )}
            {controllers.length > 1 && (
              <ToolBoxItem
                title={t("removeModel")}
                icon={RiSubtractLine}
                onClick={removeModel}
              />
            )}
          </>
        )}
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
