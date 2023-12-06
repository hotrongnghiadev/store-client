import React from "react";

import useDebounce from "../hooks/useDebouce";
import Icons from "./Icons";
import productApi from "../api/product.api";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/helpers";

const Search = () => {
  // hook start
  const [results, setResults] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdown = React.useRef(null);
  const inputRef = React.useRef(null);
  const debounceValue = useDebounce(value, 500);
  // hook end

  // function start
  const handleValue = (e) => {
    const value = e.target.value;
    // if value not start with a space, value will be updated
    if (!value.startsWith(" ")) {
      setValue(value);
    }
    //
    if (!value) {
      setDropdownOpen(false);
      setResults([]);
    }
  };
  // function end

  // effect start
  React.useEffect(() => {
    if (!value.trim()) {
      return;
    }
    (async function () {
      setIsLoading(true);
      await productApi.filter({ name: debounceValue }).then((res) => {
        console.log(res);
        setResults(res.data.data);
        setIsLoading(false);
        //
        if (res.data.data.length) setDropdownOpen(true);
      });
    })();
  }, [debounceValue]);

  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        inputRef.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  // effect end
  return (
    <>
      <form
        className={clsx("relative w-full rounded-md pl-4 transition-colors", {
          "bg-slate-200": value,
        })}
      >
        <div className="group relative flex w-full items-center rounded-md">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Icons.IconSearch className="text-base text-slate-500  group-focus-within:text-blue-500" />
          </button>
          <input
            ref={inputRef}
            type="text"
            className="w-full rounded-md bg-transparent px-2 py-2 outline-none"
            placeholder="Click to search..."
            value={value}
            onChange={handleValue}
            onFocus={() => setDropdownOpen(true)}
          />
          {/* clear */}
          {value && !isLoading && (
            <Icons.IconClose
              className="mx-3 cursor-pointer text-2xl"
              onClick={() => {
                setValue("");
                setResults([]);
                inputRef.current.focus();
              }}
            />
          )}
          {/* loading */}
          {value && isLoading && (
            <Icons.IconLoading className="mx-3 animate-spin text-xl" />
          )}
        </div>

        {/* dropdown start */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={clsx(
            "absolute right-0 z-999 mt-4 flex w-full flex-col rounded-md border bg-white shadow-md",
            `${
              dropdownOpen === true && results.length !== 0 ? "block" : "hidden"
            }`,
          )}
        >
          <ul className="flex flex-col gap-8 border-b p-4 text-sm">
            {results.map((el, index) => (
              <Link
                to={`/admin/product/update/${el.id}`}
                key={index}
                onClick={() => setDropdownOpen(false)}
                className="border-b"
              >
                <li className="flex h-full w-full items-center gap-2">
                  <div className="w-10 ">
                    <img src={el.thumb[0].path} />
                  </div>
                  <div>
                    <p className="capitalize">{el.name}</p>
                    <p className="text-red-600">{formatNumber(el.price)}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* dropdown end */}
      </form>
    </>
  );
};

export default Search;
