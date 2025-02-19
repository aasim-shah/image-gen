import { useCallback, useState } from "react";

type ApiFunction<T> = (...args: any[]) => Promise<T>;

const useApi = <T,>(apiFunction: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      try {
        const result = await apiFunction(...args);
        setData(result);
        setError(null);
        return result;
      } catch (error: any) {
        setError(
          error?.response?.data?.error ||
            error.message ||
            "Something went wrong!"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const resetLoading = () => {
    setData(null);
    setError(null);
    setLoading(true);
  };

  return {
    data,
    error,
    loading,
    execute,
    resetLoading,
  };
};

export default useApi;
