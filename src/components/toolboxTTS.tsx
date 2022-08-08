import { ToolBoxContainer, ToolBoxItem } from "./toolbox";
import { RiQuestionMark, RiVolumeUpLine, RiCloseLine } from "react-icons/ri";

type ToolBoxTTSProps = {
  synthesize: () => void;
  isLoading: boolean;
  clearText: () => void;
  text: string;
};

export const ToolBoxTTS = ({
  synthesize,
  isLoading,
  clearText,
  text,
}: ToolBoxTTSProps) => {
  return (
    <ToolBoxContainer>
      <ToolBoxItem
        title="Synthesize"
        icon={RiVolumeUpLine}
        onClick={synthesize}
        isLoading={isLoading}
      />
      <ToolBoxItem title="Help" icon={RiQuestionMark} />
      <ToolBoxItem title="Clear Text" icon={RiCloseLine} onClick={clearText} />
    </ToolBoxContainer>
  );
};
