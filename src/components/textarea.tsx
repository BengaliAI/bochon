import { Flex, Icon, Select } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";
import { STTModels, TTSModels } from "../config/models";

type TextAreaContainerProps = PropsWithChildren<{
  icon: IconType;
  title: string;
  models?: typeof STTModels | typeof TTSModels;
}>;

export const TextAreaContainer = ({
  children,
  icon,
  title,
  models,
}: TextAreaContainerProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      bg="#fff5"
      borderRadius="xl"
      shadow="xl"
      height="100%"
    >
      <Flex
        py={3}
        px={5}
        justifyContent="space-between"
        direction={["column", "column", "row"]}
        alignItems="center"
        borderBottom="1px solid #ddd"
        flexShrink={1}
      >
        <Flex fontSize="xl" alignItems="center">
          <Icon as={icon} me={3} fontSize="2xl" />
          <span>{title}</span>
        </Flex>
        {models && (
          <Select
            placeholder={t("selectModel")}
            width={["100%", "100%", "50%"]}
            mt={[5, 5, 0]}
            defaultValue={0}
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
