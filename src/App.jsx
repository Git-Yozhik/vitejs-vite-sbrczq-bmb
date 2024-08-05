import React, { useEffect, useReducer } from 'react';
import './App.css';

function save(state) {
  const a = JSON.stringify(state);
  if (!a) {
    console.log('localStorage err');
  }
  localStorage.setItem('state', a);
}

function load() {
  let a = localStorage.getItem('state');
  if (!a) {
    return undefined;
  }
  return (a = JSON.parse(a));
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_INPUT':
      return { ...state, inputValue: action.value };

    /////////////////////////
    case 'UPDATE_ARR2_WITH_INPUT':
      // Предполагается, что action.index - это индекс элемента в массиве arr2, который вы хотите обновить
      // action.value - это новое значение, которое вы хотите установить, в данном случае это значение из поля ввода
      const newArr2 = [...state.arr2];
      newArr2[action.index] = action.value;
      return { ...state, arr2: newArr2 };
    //////////////////////

    case 'ADD':
      return { ...state, count: state.count + 1 };
    case 'ADD10':
      return { ...state, count: state.count + 10 };
    case 'ADD100':
      return { ...state, count: state.count + 100 };
    case 'AGE':
      return { ...state, age: state.age + 1 };
    case 'AGE10':
      return { ...state, age: state.age + 10 };
    case '0':
      return {
        ...state,
        age: 0,
        count: 0,
        inputValue: '#',
      };

    case 'ARR':
      return { ...state, arr: [...state.arr].reverse() };
    case 'ARR2':
      return { ...state, arr2: [...state.arr2, action.value] };
    case 'COLOR_DELITE_BY_ID':
      return {
        ...state,
        arr2: state.arr2.filter((_, i) => i !== action.index),
      };

    default:
      return state;
  }
}

function App() {
  const initialState = {
    count: 0,
    age: 0,
    arr: ['#cc5', '#aaa'],
    arr2: ['#333', '#555', '#777', '#aaa'],
    inputValue: '#cc3',
  };

  const [state, dispatch] = useReducer(reducer, initialState, load);

  useEffect(() => {
    save(state);
  }, [state]);

  ////////////
  const updateArr2WithInput = (index) => {
    dispatch({
      type: 'UPDATE_ARR2_WITH_INPUT',
      index: index,
      value: state.inputValue,
    });
  };

  function colorDeliteById(index) {
    dispatch({ type: 'COLOR_DELITE_BY_ID', index: index });
    // const filterByColor = state.arr2.filter((_, i) => {
    //   i !== index;
    // });
  }

  ///////////
  return (
    <>
      <div className="mainBlock" style={{ background: state.arr[1] }}>
        <h1>ADD {state.count}</h1>
        <h2>AGE {state.age}</h2>
        <h2>{state.arr}</h2>
        <input
          value={state.inputValue}
          type="text"
          onChange={(e) => {
            dispatch({ type: 'ADD_INPUT', value: e.target.value });
          }}
        />
        <div className="button">
          <button onClick={() => dispatch({ type: 'ADD' })}>button ADD</button>
          <button onClick={() => dispatch({ type: 'ADD10' })}>
            button ADD10
          </button>
          <button onClick={() => dispatch({ type: 'ADD100' })}>
            button ADD100
          </button>
          <button onClick={() => dispatch({ type: 'AGE' })}>button AGE</button>
          <button onClick={() => dispatch({ type: 'AGE10' })}>
            button AGE10
          </button>
          <button onClick={() => dispatch({ type: '0' })}>button 0</button>
          <button onClick={() => dispatch({ type: 'ARR' })}>button ARR</button>
          <button
            onClick={() =>
              dispatch({
                type: 'ARR2',
                value: state.arr2[state.arr2.length - 1],
              })
            }
          >
            button ARR2
          </button>
          {/* //////////////// */}
          {/* //////////////////////////// */}
          {/* ... другие кнопки ... */}
          <button onClick={() => updateArr2WithInput(state.arr2.length)}>
            Arr2WithInput
          </button>
          {/* /////// */}
          {/* ///////////////// */}
        </div>
      </div>
      <div className="back-colors">
        {state.arr2.map((color, index) => {
          return (
            <div
              key={index}
              style={{ background: color }}
              className="color"
              id={color.index}
              onClick={() => colorDeliteById(index)}
            >
              {color}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
