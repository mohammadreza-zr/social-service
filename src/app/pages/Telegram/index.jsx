import { useState } from "react";

import { Header, Filters, TelegramContent } from "../../components";

export const Telegram = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <Header />
      <Filters setCategoryId={setCategoryId} setSortField={setSortField} setSearchValue={setSearchValue} />
      <TelegramContent categoryId={categoryId} sortField={sortField} searchValue={searchValue} />
    </div>
  );
};
