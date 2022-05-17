import { PureComponent, ReactNode, useCallback, useEffect, useState } from "react";

// Hook
export const useAsync = <T, I, E = string>(
    asyncFunction: (params: I) => Promise<T>,
  ) => {
    const [status, setStatus] = useState<
      "idle" | "pending" | "success" | "error"
    >("idle");
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback((params: I) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction(params)
        .then((response: any) => {
          setValue(response);
          setStatus("success");
        })
        .catch((error: any) => {
          setError(error);
          setStatus("error");
        });
    }, [asyncFunction]);
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    return { execute, status, value, error };
  };

// props for the class based async component make use of `renderProps` 
// https://reactjs.org/docs/render-props.html
// from the docs, render props are for "corss cutting concerns"
// this is in my opinion an Advnaced React Component, and also
// an Advanced Typescript Interface
export type UseAsyncClassProps<T,E> = {
  asyncFunction: () => Promise<T>,
  immediate?: boolean,
  children: (params: UseAsyncClassState<T, E> & {
      execute: () => Promise<void>;
  }) => ReactNode
}

// groupped togather all the useStates
export type UseAsyncClassState<T, E> = {
  status: "idle" | "pending" | "success" | "error",
  value: null | T,
  error: null | E,
}

// PureComponent not Component, we want to avoid rendering again 
// if we don't get new state or new props. Similar to React.memo(FunctionalComponent)
export class UseAsyncClass<T, E> extends PureComponent<UseAsyncClassProps<T, E>, UseAsyncClassState<T, E>> {
  state: UseAsyncClassState<T, E> = {
    status: "idle",
    value: null,
    error: null
  }

  componentDidMount () {
    if ( this.props.immediate ) {
      this.execute();
    }
  }
  
  // equivalent of a callback, no need to "redefine it"
  // when something changes, because we have a this scope and can access 
  // what is there on each execution.
  // fat arrow instead of normal function because we want to bind the this
  // scope to the method so we can send just the method around as a parameter
  // and keep accessing our original this. 
  execute = async () => {
    this.setState({
      status: "pending",
      value: null, 
      error: null
    });

    try {
      const asyncResult = await this.props.asyncFunction()
      this.setState({
        status: "success",
        value: asyncResult,
        error: null
      })
    } catch (err) {
      this.setState({
        status: "error",
        value: null,
        error: err as E
      })
    }
  }

  render () {
    return this.props.children({
      ...this.state,
      execute: this.execute
    })
  }
}
