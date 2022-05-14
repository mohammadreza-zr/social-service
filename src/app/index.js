import { Route, Routes } from "react-router-dom";

import { Home, Instagram, Telegram, WebSite, Whatsapp } from "./pages";
import { Payment } from "./components";

import { GetRequest } from "./services";
import { useState } from "react";
import { CartContext } from "./context";

async function test() {
  const res = await GetRequest("insta", {
    limit: 10,
    limitAsInt: 10,
    offset: 0,
    offsetAsInt: 0,
  });
  console.log(res.data);
}
// test();

const NotFound = () => {
  return <div style={{ textAlign: "center" }}>Not Found!</div>;
};

function App() {
  const [cartData, setCartData] = useState({
    type: "",
    ids: [],
  });

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web" element={<WebSite />} />
        <Route path="/whatsapp" element={<Whatsapp />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/telegram" element={<Telegram />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
