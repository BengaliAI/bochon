import { ToolBoxContainer, ToolBoxItem } from "./toolbox";
import { RiQuestionMark, RiVolumeUpLine, RiCloseLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <ToolBoxContainer>
      <ToolBoxItem
        title={t("synthesize")}
        icon={RiVolumeUpLine}
        onClick={synthesize}
        isLoading={isLoading}
      />
      <ToolBoxItem title={t("help")} icon={RiQuestionMark} />
      <ToolBoxItem title={t("clear")} icon={RiCloseLine} onClick={clearText} />
    </ToolBoxContainer>
  );
};
