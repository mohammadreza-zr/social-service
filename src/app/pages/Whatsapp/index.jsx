import { useState } from "react";

import { Header, Filters, WhatsappContent } from "../../components";

export const Whatsapp = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <Header />
      <Filters setCategoryId={setCategoryId} setSortField={setSortField} setSearchValue={setSearchValue} />
      <WhatsappContent categoryId={categoryId} sortField={sortField} searchValue={searchValue} />
    </div>
  );
};
