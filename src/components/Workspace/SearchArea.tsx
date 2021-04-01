import styled from "@emotion/styled";
import { ChangeEvent, useRef, useState } from "react";
import colors from "ui/theme";
import axios from "axios";
// @ts-ignore
import debounce from "lodash/debounce";
import useWorkspace from "./Workspace.hooks";
import { storageRef } from "firebaseEnv";

const Container = styled.div`
  display: flex;
`;

const Contents = styled.div`
  display: flex;
  position: relative;
  flex: 1 0 auto;
`;

const Searchbar = styled.input`
  width: 100%;
  height: 50px;
  font-size: 20px;
  padding: 0 60px;
  border: solid 1px gray;
  border-radius: 30px;
  box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.5);

  &:focus {
    outline: none;
    border-color: ${colors.primary.original};
    border-radius: 30px;
  }
  &[data-have="true"] {
    border-radius: 10px 10px 0 0;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

const SearchResult = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  max-height: 400px;
  top: 50px;
  background-color: white;
  border: solid 1px ${colors.primary.original};
  border-top: 0;
  overflow: auto;
  z-index: 10;
  box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.5);
`;

const RemoveIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: calc(100% - 32px);
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Package = styled.div`
  padding: 10px;
  cursor: pointer;

  & > div:first-of-type {
    font-size: 20px;
  }
  & > div:last-of-type {
    font-size: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: gray;
  }
  &:hover {
    background-color: rgba(253, 193, 81, 0.7);
  }
`;

const SearchArea = () => {
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  const addLibrary = useWorkspace((s) => s.addLibrary);

  const clickPackage = async (name: string) => {
    const color = "#000000".replace(/0/g, () =>
      (~~(Math.random() * 16)).toString(16)
    );
    const imageRef = storageRef.child(`logos/${name}.png`);

    let fullPath = "";
    await imageRef
      .getDownloadURL()
      .then((url) => {
        fullPath = url;
      })
      .catch(() => {
        fullPath = "";
      });

    addLibrary({ name, color, fullPath });
  };

  const clickRemoveIcon = () => {
    if (!ref.current) return;

    ref.current.value = "";
    setSearchResults([]);
  };

  const debounced = debounce(async (value: string) => {
    if (value.length <= 0) {
      setSearchResults([]);
      setIsOpenResult(false);

      return;
    }

    // https://docs.github.com/en/free-pro-team@latest/rest/reference/search
    console.log("debounced: ", value);
    await axios
      .get("https://api.github.com/search/repositories", {
        params: {
          q: value,
        },
      })
      .then(({ data }) => {
        setSearchResults(data.items);
        if (data.items.length === 0) setIsOpenResult(false);
        else setIsOpenResult(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 500);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    debounced(value);
  };

  const renderResults = () => {
    return searchResults.map((result: any, index: number) => {
      return (
        <Package
          key={index}
          onPointerDown={() => {
            clickPackage(result.full_name);
            clickRemoveIcon();
          }}
        >
          <div>{result.full_name}</div>
          <div>{result.description}</div>
        </Package>
      );
    });
  };

  return (
    <Container>
      <Contents>
        <SearchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              fill="gray"
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </SearchIcon>
        <Searchbar
          ref={ref}
          type="text"
          data-have={isOpenResult}
          placeholder="Search your library"
          onChange={handleChange}
          onFocus={() => {
            if (searchResults.length > 0) setIsOpenResult(true);
          }}
          onBlur={() => setIsOpenResult(false)}
        />
        <RemoveIcon onClick={clickRemoveIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              fill="gray"
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </RemoveIcon>
        {isOpenResult && searchResults.length > 0 && (
          <SearchResult ref={searchResultsRef}>{renderResults()}</SearchResult>
        )}
      </Contents>
    </Container>
  );
};

export default SearchArea;
