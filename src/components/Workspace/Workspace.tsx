import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, forwardRef, useCallback, useRef, useState, useEffect } from "react";
// @ts-ignore
import debounce from "lodash/debounce";
import LibZone from "./LibZone";
import useWorkspace, { Library } from "./Workspace.hooks";
import theme from "ui/theme";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 100px;
`;

const Searchbar = styled.input`
  width: 50%;
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

const SearchIcon = styled.img`
  position: absolute;
  width: 24px;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

const SearchResult = styled.div`
  position: absolute;
  width: 50%;
  height: auto;
  max-height: 400px;
  background-color: white;
  border: solid 1px ${theme.primary};
  border-top: 0;
  overflow: auto;
`;

const RemoveIcon = styled.img`
  position: absolute;
  width: 20px;
  top: 50%;
  left: calc(50% - 32px);
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
    color: gray;
  }
`;

const Workspace = () => {
  const [librarys, setLibrarys] = useState(Array<Library>());
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState(Array<Library>());
  const addLibrary = useWorkspace((s) => s.addLibrary);
  const ref = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const result = new Array<Library>()
    axios
      .get(`https://api.github.com/repos/seungyoungYang/storage/contents/asset/logo`)
      .then(({ data }) => {
        data.map((library: any) => {
          result.push(new Library(library.name, library.path));
        });
      })
      .catch((err) => {
        console.log(err);
        setLibrarys(Array<Library>());
      });
    setLibrarys(result);
  }, []);

  const debounced = useCallback(
    debounce((librarys: Array<Library>, value: string) => {
      setIsOpenResult(false);
      setSearchResults(Array<Library>());

      if (value === "") {
        return
      }

      const filtered = librarys.filter((library) => {
        if (library.name.match(value)) {
          return true;
        }
      });

      if (filtered.length > 0) {
        setIsOpenResult(true);
        setSearchResults(filtered);
      }
    }, 200),
    []
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounced(librarys, value);
  };

  const clickPackage = (library: Library) => {
    addLibrary(library);
  };

  const clickRemoveIcon = () => {
    if (!ref.current) return;

    ref.current.value = "";
    debounced(librarys, "");
  };

  const renderResults = () => {
    return searchResults.map((result: any, index: number) => {
      return (
        <Package
          key={index}
          onPointerDown={() => {
            clickPackage(new Library(result.name, result.path));
            clickRemoveIcon();
          }}
        >
          <img src={`https://raw.githubusercontent.com/SeungyoungYang/storage/master/${result.path}`} height="100" />
          <div>{result.name}</div>
        </Package>
      );
    });
  };

  return (
    <Container>
      <div style={{ position: "relative" }}>
        <SearchIcon src="/common/search.svg" />
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
        <RemoveIcon src="/common/close.svg" onClick={clickRemoveIcon} />
        {isOpenResult && searchResults.length > 0 && (
          <SearchResult ref={searchResultsRef}>{renderResults()}</SearchResult>
        )}
      </div>
      <LibZone />
    </Container >
  );
};

export default forwardRef(Workspace);
