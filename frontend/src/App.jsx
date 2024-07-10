import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("./components/MainPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
