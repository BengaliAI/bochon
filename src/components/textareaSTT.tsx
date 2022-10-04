import { Box, Icon, Text, Center } from "@chakra-ui/react";
import { RiMic2Line, RiMicLine, RiUploadLine } from "react-icons/ri";
import { TextAreaContainer } from "./textarea";
import { Trans, useTranslation } from "react-i18next";
import { STTModels } from "../config/models";
import { useCallback } from "react";
import { LocalStorageHandler } from "../utils/localstorageHandler";
import { ConnectionController } from "../controllers/connectionController";

type TextAreaSTTProps = {
  recognizedText: string;
  recognizingText: string;
  isRecording: boolean;
  isSpeaking: boolean;
  connectionController: ConnectionController;
};

export const TextAreaSTT = ({
  recognizedText,
  recognizingText,
  isRecording,
  isSpeaking,
  connectionController,
}: TextAreaSTTProps) => {
  const { t } = useTranslation();

  const onModelChange = useCallback(
    (modelIndex: string) => {
      LocalStorageHandler.setSTTModelIndex(modelIndex);
      connectionController.disconnect();
      connectionController.connect(
        STTModels[parseInt(modelIndex)].url,
        STTModels[parseInt(modelIndex)].path
      );
    },
    [connectionController]
  );

  return (
    <TextAreaContainer
      icon={RiMic2Line}
      title={t("speechToText")}
      models={STTModels}
      onModelChange={onModelChange}
    >
      <Box fontSize="lg" height="100%" flexGrow={1} px={5} py={3}>
        {!recognizedText &&
          !recognizingText &&
          (isRecording ? (
            <Text display="inline" color="gray.500">
              {t("listening")}
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
              <Text
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Trans t={t} i18nKey="recordHelp">
                  Click <Icon as={RiMicLine} mx={2} /> to start live
                  transcribing
                </Trans>
              </Text>

              <Text
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Trans t={t} i18nKey="uploadHelp">
                  Click <Icon as={RiUploadLine} mx={2} /> to upload audio file
                </Trans>
              </Text>
            </Center>
          ))}

        {recognizedText && (
          <Text fontSize="md" display="inline">
            {recognizedText}{" "}
          </Text>
        )}
        {recognizingText && (
          <Text display="inline" fontSize="md" color="gray.500">
            {recognizingText}
          </Text>
        )}
        {isSpeaking && recognizedText && (
          <Text display="inline" fontSize="md" color="gray.500">
            {t("listening")}
          </Text>
        )}
      </Box>
    </TextAreaContainer>
  );
};
