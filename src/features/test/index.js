import { Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrementByAmount,
} from "../../redux/CreateSlice/counterSlice";
export default function Test() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className="thong-wrapper">
        <div className="thong-inner">
          <Button variant="outlined" onClick={() => dispatch(increment())}>
            Increment
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(decrementByAmount(2))}
          >
            DecrementByAmount
          </Button>
          <h3>{value}</h3>
        </div>
      </div>
    </>
  );
}
