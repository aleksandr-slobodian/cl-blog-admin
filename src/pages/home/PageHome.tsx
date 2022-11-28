import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementByAmountAsync,
  selectCount,
} from "../../state/counter";

export const PageHome: React.FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number>(2);
  return (
    <div>
      <h1>Homepage</h1>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div>
        <div>
          <input
            type="text"
            value={incrementAmount}
            onChange={(event) =>
              setIncrementAmount(parseInt(event.target.value))
            }
          />
          <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
            +++
          </button>
          <button
            onClick={() => dispatch(incrementByAmountAsync(incrementAmount))}
          >
            delay +++
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
