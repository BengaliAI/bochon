import { Box, Icon, Text, Center } from "@chakra-ui/react";
import { RiMic2Line, RiMicLine, RiUploadLine } from "react-icons/ri";
import { TextAreaContainer } from "./textarea";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <TextAreaContainer
      icon={RiMic2Line}
      title={t("speechToText")}
      models={models}
    >
      <Box fontSize="lg" height="100%" flexGrow={1} px={10} py={5}>
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
