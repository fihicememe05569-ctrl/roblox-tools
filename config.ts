export class InputValidator {
    static validateString(input: string): boolean {
        return typeof input === 'string' && input.trim() !== '';
    }
    static validateNumber(input: number): boolean {
        return typeof input === 'number' && !isNaN(input);
    }
    static validateBoolean(input: boolean): boolean {
        return typeof input === 'boolean';
    }
}

const processInput = (input: any) => {
    if (!InputValidator.validateString(input.username)) {
        throw new Error('Invalid username.');
    }
    if (!InputValidator.validateNumber(input.age)) {
        throw new Error('Invalid age.');
    }
    if (!InputValidator.validateBoolean(input.isActive)) {
        throw new Error('Invalid active status.');
    }
    console.log('Input is valid:', input);
};

try {
    const userInput = { username: 'Player1', age: 20, isActive: true };
    processInput(userInput);
} catch (error) {
    console.error(error.message);
}
