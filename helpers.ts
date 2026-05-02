function isValidInput(input: any): boolean {
    if (typeof input !== 'string') return false;
    const trimmed = input.trim();
    return trimmed.length > 0 && /^[a-zA-Z0-9_]+$/.test(trimmed);
}

function processInput(input: any): void {
    if (!isValidInput(input)) {
        console.error('Invalid input. Please provide a valid string.');
        return;
    }
    const processedInput = input.trim().toLowerCase();
    console.log('Processing:', processedInput);
}

function mainLoop(inputs: any[]): void {
    for (const input of inputs) {
        processInput(input);
    }
}

// Example usage:
const userInputs = ['hello', 'world', '', '123!', null];
mainLoop(userInputs);