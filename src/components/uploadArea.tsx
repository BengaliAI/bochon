import { TextAreaContainer } from "./textarea";
import { RiFileUploadLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export const UploadArea = () => {
  const { t } = useTranslation();
  return (
    <TextAreaContainer icon={RiFileUploadLine} title={t("uploadModel")}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
      necessitatibus dicta, alias quibusdam reiciendis placeat dolor odio
      numquam laudantium quis neque excepturi repudiandae odit, sit non,
      nesciunt soluta debitis iusto.
    </TextAreaContainer>
  );
};
