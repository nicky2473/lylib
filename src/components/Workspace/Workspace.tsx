import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, forwardRef, useCallback, useRef, useState } from "react";
// @ts-ignore
import debounce from "lodash/debounce";
import LibZone from "./LibZone";
import useWorkspace from "./Workspace.hooks";

const Container = styled.div`
  position: relative;
  height: 100%;
  padding: 50px 100px;
`;

const Searchbar = styled.input`
  width: 100%;
  height: 70px;
  font-size: 40px;
  padding: 0 0 0 72px;
  border-color: black;
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 32px;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

const SearchResult = styled.div`
  position: absolute;
  width: calc(100% - 200px);
  height: auto;
  max-height: 400px;
  background-color: white;
  border: solid 1px black;
  overflow: auto;
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
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]);
  const addLibrary = useWorkspace((s) => s.addLibrary);

  const debounced = useCallback(
    debounce(async (value: string) => {
      // https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search
      await axios
        .get(`http://registry.npmjs.com/-/v1/search?text=${value}`)
        .then(({ data }) => {
          console.log(data);
          setSearchResults(data.objects);
          if (data.objects.length === 0) setIsOpenResult(false);
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
    debounced(value);
  };

  const clickPackage = (name: string) => {
    console.log(name);
    addLibrary(name);
  };

  const renderResults = () => {
    return searchResults.map((result: any, index: number) => {
      return (
        <Package
          key={index}
          onPointerDown={() => clickPackage(result.package.name)}
        >
          <div>{result.package.name}</div>
          <div>{result.package.description}</div>
        </Package>
      );
    });
  };

  return (
    <Container>
      <div style={{ position: "relative" }}>
        <SearchIcon src="/search.svg" />
        <Searchbar
          type="text"
          onChange={handleChange}
          onFocus={() => setIsOpenResult(true)}
          onBlur={() => setIsOpenResult(false)}
        />
      </div>
      {isOpenResult && searchResults.length > 0 && (
        <SearchResult>{renderResults()}</SearchResult>
      )}
      <LibZone />
    </Container>
  );
};

export default forwardRef(Workspace);
