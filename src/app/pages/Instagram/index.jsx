import { useState } from "react";

import { Header, Filters, InstagramContent } from "../../components";

export const Instagram = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <Header />
      <Filters setCategoryId={setCategoryId} setSortField={setSortField} setSearchValue={setSearchValue} />
      <InstagramContent categoryId={categoryId} sortField={sortField} searchValue={searchValue} />
    </div>
  );
};
