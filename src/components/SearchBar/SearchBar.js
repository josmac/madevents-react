import React, { useEffect, useRef, useState } from "react";
import { search } from "../../services/api-client";

const useSearch = () => {
  const [value, setValue] = useState("");
  const intervalId = useRef();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    window.clearTimeout(intervalId.current);

    if (value.length <= 3) {
      return;
    }

    intervalId.current = window.setTimeout(() => {
      search(value);
    }, 2000);
  }, [value]);

  return [value, onChange];
};

const SearchBar = () => {
  const [value, onChange] = useSearch();

  return (
    <div className="SeachBar">
      <input
        type="text"
        onChange={onChange}
        value={value}
        className="form-control"
        placeholder="Search"
      />
      {value}
    </div>
  );
};

export default SearchBar;
