export function validateInput(input: unknown): boolean {
    if (typeof input !== 'object' || input === null) {
        return false;
    }
    const { username, age } = input as { username: unknown; age: unknown; };
    if (typeof username !== 'string' || username.length < 3) {
        return false;
    }
    if (typeof age !== 'number' || age < 13 || age > 120) {
        return false;
    }
    return true;
}

export function processInput(inputs: unknown[]): void {
    for (const input of inputs) {
        if (!validateInput(input)) {
            console.warn('Invalid input detected:', input);
            continue;
        }
        const { username, age } = input as { username: string; age: number; };
        console.log(`Processing user: ${username}, Age: ${age}`);
    }
}
