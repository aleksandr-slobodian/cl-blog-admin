import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import { APP_ITEMS_PER_PAGE } from "../../config";

interface PagerProps {
  page: number;
  count?: number;
  setPage: (page: number) => void;
  isFetching?: boolean;
}

export const Pager: React.FC<PagerProps> = ({
  page,
  setPage,
  isFetching,
  count,
}) => {
  return (
    <ButtonGroup size="small">
      <Button
        variant={"contained"}
        onClick={() => setPage(page > 1 ? page - 1 : 1)}
        disabled={isFetching || page <= 1}
      >
        Previous
      </Button>
      <Button
        variant={"contained"}
        onClick={() => setPage(page + 1)}
        disabled={isFetching || !!(count && count < APP_ITEMS_PER_PAGE)}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};
