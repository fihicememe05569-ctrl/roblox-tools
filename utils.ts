export function safeGet<T>(obj: Record<string, any>, key: string): T | null {
    try {
        if (obj == null) throw new Error(`Object is null or undefined`);
        if (!(key in obj)) throw new Error(`Key '${key}' does not exist in object`);
        const value = obj[key];
        if (value == null) throw new Error(`Value for key '${key}' is null or undefined`);
        return value;
    } catch (error) {
        console.error(`Error in safeGet: ${error.message}`);
        return null;
    }
}

export function parseJSON<T>(jsonString: string): T | null {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error(`Error parsing JSON: ${error.message}`);
        return null;
    }
}

export function validateNumberRange(value: number, min: number, max: number): boolean {
    if (typeof value !== 'number') {
        console.error('Value must be a number');
        return false;
    }
    if (value < min || value > max) {
        console.error(`Value ${value} is out of range (${min}-${max})`);
        return false;
    }
    return true;
}