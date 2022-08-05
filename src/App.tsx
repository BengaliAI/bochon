import { Heading } from "@chakra-ui/react";
import { AppLayout } from "./components/layout";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const SpeechToTextPage = lazy(() => import("./pages/speechToText"));
const TextToSpeechPage = lazy(() => import("./pages/textToSpeech"));

function App() {
  return (
    <AppLayout>
      <Heading size="xl" mb={3}>
        বচন
      </Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/stt" replace />} />
            <Route path="/stt" element={<SpeechToTextPage />} />
            <Route path="/tts" element={<TextToSpeechPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppLayout>
  );
}

export default App;
