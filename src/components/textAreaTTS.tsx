import { Textarea } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RiVolumeUpLine } from "react-icons/ri";
import { TextAreaContainer } from "./textarea";

type TextAreaTTSProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const models = [{ name: "Microsoft Azure", value: "azure" }];

export const TextAreaTTS = ({ text, setText }: TextAreaTTSProps) => {
  return (
    <TextAreaContainer
      icon={RiVolumeUpLine}
      title="Text To Speech"
      models={models}
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
        placeholder="Type your desired text here..."
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
