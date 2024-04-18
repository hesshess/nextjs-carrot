import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prv) => {
      return { ...prv, loading: true };
    });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch(() => {})
      .then((data) =>
        setState((prv) => {
          return { ...prv, data };
        }),
      )
      .catch((error) =>
        setState((prv) => {
          return { ...prv, error };
        }),
      )
      .finally(() =>
        setState((prv) => {
          return { ...prv, loading: false };
        }),
      );
  }
  return [mutation, state];
}
