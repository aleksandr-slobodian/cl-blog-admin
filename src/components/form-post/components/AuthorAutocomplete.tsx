import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { useDebounce } from "react-use";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useListUsersQuery } from "../../../services/users";
import { User } from "../../../types/api";

interface AuthorAutocompleteProps {
  label: string;
  placeholder: string;
  selected?: User;
  handleChange: (event: SyntheticEvent, value: User | null | undefined) => void;
  sx?: SxProps;
  noOptionsText?: string;
  textFieldProps?: TextFieldProps;
}

export const AuthorAutocomplete: React.FC<AuthorAutocompleteProps> = ({
  label,
  sx,
  handleChange,
  placeholder,
  noOptionsText,
  selected,
  textFieldProps,
}) => {
  const [searchTitle, setSearchTitle] = useState<string>();
  const [debouncedSearchTitle, setdebounceDSearchTitle] = useState<string>();

  useDebounce(
    () => {
      setdebounceDSearchTitle(searchTitle?.trim());
    },
    1000,
    [searchTitle]
  );

  const [selectedUser, setSelectedUser] = useState<User | null | undefined>(
    selected || undefined
  );

  const {
    data: usersList,
    isLoading: isUsersLoading,
    isFetching: isUserFetching,
  } = useListUsersQuery(
    {
      _limit: "20",
      isAdmin: true,
      name_like: debouncedSearchTitle,
    },
    {
      skip: !debouncedSearchTitle,
    }
  );

  const handleUserChange = useCallback(
    (event: SyntheticEvent, value: User | null | undefined) => {
      setSelectedUser(value);
      handleChange(event, value || undefined);
    },
    [handleChange]
  );

  const handleInputChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      if (selectedUser?.name === value) {
        return;
      }
      setSearchTitle(value);
    },
    [selectedUser]
  );

  return (
    <Autocomplete
      noOptionsText={noOptionsText}
      loading={isUsersLoading || isUserFetching}
      options={
        usersList?.length ? usersList : selectedUser ? [selectedUser] : []
      }
      value={selectedUser}
      onInputChange={handleInputChange}
      onChange={handleUserChange}
      getOptionLabel={(option: User) => option.name}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          {...params}
          {...textFieldProps}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isUsersLoading || isUserFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li {...props} key={`itm-ac-u-${option.id}`}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={`itm-ac-u-prt-${index}`}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
      isOptionEqualToValue={(option, value) =>
        option.id === value.id && option.name === value.name
      }
      sx={sx}
    />
  );
};

export default AuthorAutocomplete;
