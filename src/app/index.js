import { Route, Routes } from "react-router-dom";

import { Home, Instagram, Telegram, WebSite, Whatsapp } from "./pages";
import { Payment } from "./components";

const NotFound = () => {
  return <div style={{ textAlign: "center" }}>Not Found!</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/web" element={<WebSite />} />
      <Route path="/whatsapp" element={<Whatsapp />} />
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/telegram" element={<Telegram />} />
      <Route path="/payment" element={<Payment />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
