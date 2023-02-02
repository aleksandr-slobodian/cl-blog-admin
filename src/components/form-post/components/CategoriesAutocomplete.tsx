import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useListCategoriesQuery } from "../../../services/categories";
import { Category } from "../../../types/api";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SxProps } from "@mui/material/styles";

interface CategoriesAutocompleteProps {
  values?: string[];
  label: string;
  handleChange: (event: SyntheticEvent, values: Category[]) => void;
  sx?: SxProps;
}

export const CategoriesAutocomplete: React.FC<CategoriesAutocompleteProps> = ({
  values,
  handleChange,
  label,
  sx,
}) => {
  const { data: categoriesList, isLoading: isCategoriesLoading } =
    useListCategoriesQuery();

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  useEffect(() => {
    if (values?.length && categoriesList?.length) {
      setSelectedCategories(
        categoriesList.filter(({ id }) => values.includes(id))
      );
    }
  }, [categoriesList, values]);

  const handleCategoriesChange = useCallback(
    (event: SyntheticEvent, values: Category[]) => {
      setSelectedCategories(values);
      handleChange(event, values);
    },
    [handleChange]
  );

  return (
    <Autocomplete
      multiple
      loading={isCategoriesLoading}
      options={categoriesList || []}
      value={selectedCategories}
      onChange={handleCategoriesChange}
      getOptionLabel={(option: Category) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isCategoriesLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      sx={sx}
    />
  );
};

export default CategoriesAutocomplete;
