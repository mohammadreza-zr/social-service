import { useState } from "react";

import { Header, Filters, WebContent } from "../../components";

export const WebSite = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <Header />
      <Filters setCategoryId={setCategoryId} setSortField={setSortField} setSearchValue={setSearchValue} />
      <WebContent categoryId={categoryId} sortField={sortField} searchValue={searchValue} />
    </div>
  );
};
