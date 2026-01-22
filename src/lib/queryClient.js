import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: async ({ queryKey }) => {
                const res = await fetch(queryKey[0], {
                    credentials: "include"
                });

                if (!res.ok) {
                    if (res.status >= 500) {
                        throw new Error(`${res.status}: ${res.statusText}`);
                    }
                    throw new Error(`${res.status}: ${await res.text()}`);
                }

                return res.json();
            },
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: false
        },
        mutations: {
            retry: false
        }
    }
});

export async function apiRequest(method, url, data) {
    const options = {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
        if (res.status >= 500) {
            throw new Error(`${res.status}: ${res.statusText}`);
        }

        const text = await res.text();
        throw new Error(`${res.status}: ${text}`);
    }

    if (res.headers.get("content-type")?.includes("application/json")) {
        return res.json();
    }

    return res;
}
