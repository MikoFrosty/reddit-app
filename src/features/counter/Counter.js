import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div data-testid="counter">
      <div className={styles.row}>
        <button
          data-testid="decrement"
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          data-testid="increment"
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          data-testid="incrementAmount"
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          data-testid="incrementByAmount"
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          data-testid="incrementAsync"
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          data-testid="incrementIfOdd"
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
