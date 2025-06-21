"use client";

import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

export function SearchBar() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <InputGroup startElement={<FiSearch />} endElement={endElement} width="2/3">
      <Input
        ref={inputRef}
        placeholder="What are you looking for"
        colorPalette={"blue"}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </InputGroup>
  );
}
