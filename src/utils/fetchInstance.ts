function createFetchInstance(baseUrl: string, defaultHeaders: Headers) {
  return async (url: string, options: { headers?: HeadersInit } = {}) => {
    const mergedHeaders = { ...defaultHeaders, ...options.headers };
    const mergedOptions = { ...options, headers: mergedHeaders };

    return fetch(`${baseUrl}${url}`, mergedOptions);
  };
}

// Create a custom fetch instance with default headers
const fetchInstance = createFetchInstance(
  process.env.NEXT_BASE_URL || "",
  new Headers({
    "Content-Type": "application/json",
  })
);

export default fetchInstance;
