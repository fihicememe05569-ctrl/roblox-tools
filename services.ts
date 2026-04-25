import { HttpService } from 'roblox-services';

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const response = await HttpService.GetAsync(url);
        const data: T = JSON.parse(response);
        return { data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { error: `Failed to fetch data: ${errorMessage}` };
    }
}

export function validateInput(input: unknown): boolean {
    if (typeof input !== 'string') return false;
    return input.length > 0 && input.length < 100;
}

export function handleApiResponse<T>(response: ApiResponse<T>): void {
    if (response.error) {
        print(`Error: ${response.error}`);
        return;
    }
    print(`Data received: ${JSON.stringify(response.data)}`);
}

export function safeFetchData<T>(url: string): void {
    const validUrl = validateInput(url);
    if (!validUrl) {
        print('Invalid URL provided.');
        return;
    }
    fetchData<T>(url).then(handleApiResponse);
}