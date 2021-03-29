import styled from "@emotion/styled";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import theme from "ui/theme";
import axios from "axios";
// @ts-ignore
import debounce from "lodash/debounce";
import useWorkspace from "./Workspace.hooks";
import SVG from "ui/svg/SVG";
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
  &:focus {
    outline: none;
    border-color: ${theme.primary};
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
  border: solid 1px ${theme.primary};
  border-top: 0;
  overflow: auto;
  z-index: 10;
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
  &:hover {
    background-color: rgba(249, 167, 38, 0.7);
  }
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
`;

const SearchArea = () => {
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  const addLibrary = useWorkspace((s) => s.addLibrary);

  const clickPackage = async (name: string) => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const filename = name.replace("/", "-");
    const imageRef = storageRef.child(`logos/${filename}.png`);

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

  const debounced = useCallback(
    debounce(async (value: string) => {
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/search
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
    }, 200),
    []
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 0) {
      setSearchResults([]);
      setIsOpenResult(false);
    } else {
      debounced(value);
    }
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
          <SVG filename="common/search" />
        </SearchIcon>
        <Searchbar
          ref={ref}
          type="text"
          data-have={isOpenResult}
          onChange={handleChange}
          onFocus={() => {
            if (searchResults.length > 0) setIsOpenResult(true);
          }}
          onBlur={() => setIsOpenResult(false)}
        />
        <RemoveIcon onClick={clickRemoveIcon}>
          <SVG filename="common/close" />
        </RemoveIcon>
        {isOpenResult && searchResults.length > 0 && (
          <SearchResult ref={searchResultsRef}>{renderResults()}</SearchResult>
        )}
      </Contents>
    </Container>
  );
};

export default SearchArea;
