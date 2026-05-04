type RobloxData<T> = {
  id: string;
  data: T;
};

function fetchRobloxData<T>(url: string): Promise<RobloxData<T>> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data: T) => ({
      id: url.split('/').pop() || 'unknown',
      data,
    }));
}

function mapRobloxData<T, U>(robloxData: RobloxData<T>, transformFn: (data: T) => U): RobloxData<U> {
  return {
    id: robloxData.id,
    data: transformFn(robloxData.data),
  };
}

export { fetchRobloxData, mapRobloxData };