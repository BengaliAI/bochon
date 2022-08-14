import { AppLayout } from "./components/layout";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppRoutesUI } from "./config/appRoute";
import { useTranslation } from "react-i18next";
import "./app.css";
import "./config/i18n";

const SpeechToTextPage = lazy(() => import("./pages/speechToText"));
const TextToSpeechPage = lazy(() => import("./pages/textToSpeech"));

function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <AppLayout>
          <Routes>
            <Route
              path={AppRoutesUI.Root}
              element={<Navigate to="/stt" replace />}
            />
            <Route path={AppRoutesUI.STT()} element={<SpeechToTextPage />} />
            <Route path={AppRoutesUI.TTS()} element={<TextToSpeechPage />} />
          </Routes>
        </AppLayout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
