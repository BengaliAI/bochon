import { Textarea } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RiVolumeUpLine } from "react-icons/ri";
import { TextAreaContainer } from "./textarea";
import { useTranslation } from "react-i18next";
import { TTSModels } from "../config/models";

type TextAreaTTSProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export const TextAreaTTS = ({ text, setText }: TextAreaTTSProps) => {
  const { t } = useTranslation();

  return (
    <TextAreaContainer
      icon={RiVolumeUpLine}
      title={t("textToSpeech")}
      models={TTSModels}
    >
      <Textarea
        fontSize="lg"
        height="100%"
        flexGrow={1}
        px={10}
        py={5}
        border="none"
        outline="none"
        shadow="none"
        bg="transparent"
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        placeholder={t("typePrompt")}
        sx={{
          "&:focus-visible": {
            boxShadow: "none",
            border: "none",
          },
        }}
      />
    </TextAreaContainer>
  );
};
