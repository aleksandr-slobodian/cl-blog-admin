import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementByAmountAsync,
  selectCount,
} from "../../state/counter";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const PageHome: React.FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number>(2);
  return (
    <div>
      <h1>Homepage</h1>
      <div>{count}</div>
      <div>
        <Button variant="outlined" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <Button variant="outlined" onClick={() => dispatch(increment())}>
          +
        </Button>
      </div>
      <div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            value={incrementAmount}
            onChange={(event) =>
              setIncrementAmount(parseInt(event.target.value))
            }
          />
          <Button
            variant="outlined"
            onClick={() => dispatch(incrementByAmount(incrementAmount))}
          >
            +++
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(incrementByAmountAsync(incrementAmount))}
          >
            delay +++
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
