import { Flex, Icon, Select } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";
import { STTModels, TTSModels } from "../config/models";

type TextAreaContainerProps = PropsWithChildren<{
  icon: IconType;
  title: string;
  models?: typeof STTModels | typeof TTSModels;
  onModelChange?: (modelIndex: string) => void;
}>;

export const TextAreaContainer = ({
  children,
  icon,
  title,
  models,
  onModelChange,
}: TextAreaContainerProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      bg="#fff5"
      borderRadius="xl"
      shadow="xl"
      height="100%"
      mb={3}
    >
      <Flex
        py={2}
        px={5}
        justifyContent="space-between"
        direction={["column", "column", "row"]}
        alignItems="center"
        borderBottom="1px solid #ddd"
        flexShrink={1}
      >
        <Flex fontSize="lg" alignItems="center">
          <Icon as={icon} me={3} fontSize="xl" />
          <span>{title}</span>
        </Flex>
        {models && (
          <Select
            placeholder={t("selectModel")}
            width={["100%", "100%", "50%"]}
            mt={[5, 5, 0]}
            defaultValue={0}
            size="sm"
            onChange={(e) => onModelChange?.(e.target.value)}
          >
            {models.map((model, index) => (
              <option key={index} value={index}>
                {model.name}
              </option>
            ))}
          </Select>
        )}
      </Flex>
      {children}
    </Flex>
  );
};
