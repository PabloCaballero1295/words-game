import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { MainPage } from "./components/MainPage/MainPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
)
