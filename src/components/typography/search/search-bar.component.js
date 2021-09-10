import React from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components";

const Search = styled(Searchbar)`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.theme.space[4]};
  width: 95%;
  left: ${(props) => props.theme.space[3]};
`;

export const SearchBar = ({ searchKeyword, onSearch, onChangeText }) => {
  return (
    <Search
      value={searchKeyword}
      placeholder="Search for product"
      onSubmitEditing={onSearch}
      onChangeText={onChangeText}
    />
  );
};
