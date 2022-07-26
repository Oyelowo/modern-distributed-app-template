import React, { Reducer, useReducer, useEffect } from 'react';

type State<Data, ErrorMess> =
  | {
      status: 'idle';
    }
  | {
      status: 'attempt';
    }
  | {
      status: 'success';
      data: Data;
    }
  | {
      status: 'failure';
      error: ErrorMess;
    };

type Action<Data, Err> =
  | {
      type: 'request';
    }
  | {
      type: 'receive';
      data: Data;
    }
  | {
      type: 'errorOut';
      error: Err;
    };

interface MyData {
  name: 'oyelowo';
  age: 12;
  nationality: 'Finnish';
}

interface ErrorType {
  message: string;
}

type ApiReducer = Reducer<State<MyData, ErrorType>, Action<MyData, ErrorType>>;

const apiReducer: ApiReducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        status: 'attempt',
        data: null,
      };
    case 'receive':
      return {
        ...state,
        data: action.data,
        status: 'success',
      };
    case 'errorOut':
      return {
        ...state,
        data: null,
        status: 'failure',
        error: action.error,
      };

    default:
      return state;
  }
};

const ImpossibleState = () => {
  const [state, dispatch] = useReducer(apiReducer, { status: 'idle' });
  const { status: _st } = state;

  useEffect(() => {
    dispatch({ type: 'request' });
    dispatch({
      type: 'receive',
      data: { name: 'oyelowo', nationality: 'Finnish', age: 12 },
    });
    dispatch({ type: 'errorOut', error: { message: 'anythign' } });
    return () => {};
  }, []);

  if (state.status === 'success') {
    const {
      status: _s,
      data: { name: _n },
    } = state;
    const _kk = state.data;
  }
  if (state.status === 'failure') {
    const { status: _s, error: _e } = state;
  }
  return <div>x</div>;
};

export default ImpossibleState;
