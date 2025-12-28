import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { parseErrorResponse } from "./errorHandling";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorMessage = await parseErrorResponse(res);
    throw new Error(errorMessage);
  }
}

// apiRequest supports two call styles:
// 1) apiRequest(method, url, data?)
// 2) apiRequest(url, options?) where options is a RequestInit-like object and may include a `body` (object|string)
type CustomRequestInit = Omit<RequestInit, 'body'> & { body?: unknown };

export async function apiRequest<T = any>(
  methodOrUrl: string,
  maybeUrlOrOptions?: string | CustomRequestInit,
  maybeData?: unknown,
): Promise<T> {
  let method = 'GET';
  let url = '';
  let options: RequestInit = { credentials: 'include' };

  const upper = (s: string) => s && s.toUpperCase();

  if (typeof maybeUrlOrOptions === 'string') {
    // style: apiRequest(method, url, data?)
    method = upper(methodOrUrl) || 'GET';
    url = maybeUrlOrOptions;
    options = { method, credentials: 'include' };
    if (maybeData !== undefined) {
      options.headers = { ...(options.headers || {}), 'Content-Type': 'application/json' };
      options.body = typeof maybeData === 'string' ? maybeData : JSON.stringify(maybeData);
    }
  } else {
    // style: apiRequest(url, options?)
    url = methodOrUrl;
    const provided = maybeUrlOrOptions as (RequestInit & { body?: unknown }) | undefined;
    options = { ...(provided || {}), credentials: 'include' };
    if (provided && provided.body !== undefined) {
      // allow passing object bodies
      if (typeof provided.body === 'string') {
        options.body = provided.body;
      } else {
        options.headers = { ...(options.headers || {}), 'Content-Type': 'application/json' };
        options.body = JSON.stringify(provided.body);
      }
    }
    method = upper(String(options.method || 'GET'));
  }

  const res = await fetch(url, options);
  await throwIfResNotOk(res);

  if (res.status === 204) return undefined as unknown as T;

  // Try to parse JSON, but fall back to text if not JSON
  try {
    return (await res.json()) as T;
  } catch (err) {
    const txt = await res.text();
    return txt as unknown as T;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = (options: { on401: UnauthorizedBehavior }): QueryFunction<any> => {
  const { on401: unauthorizedBehavior } = options;
  return async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null as any;
    }

    await throwIfResNotOk(res);
    // parse JSON as any to allow useQuery callers to opt into types
    return (await res.json()) as any;
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
