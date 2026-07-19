import { createContext, useContext, useState } from "react";

export const SearchTermContext = createContext(null);

const SearchTermProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const onSearch = (value) => setSearchTerm(value);

  return (
    <SearchTermContext.Provider value={{ searchTerm, onSearch }}>
      {children}
    </SearchTermContext.Provider>
  );
};

export default SearchTermProvider;

export const useSearchTerm = () => {
  return useContext(SearchTermContext);
};
