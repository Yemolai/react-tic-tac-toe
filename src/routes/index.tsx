import { Route, Routes } from "react-router";
import Landing from "./landing";
import Online from "./online";
import Solo from "./solo";

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/solo" element={<Solo />} />
    <Route path="/online" element={<Online />} />
  </Routes>
)
