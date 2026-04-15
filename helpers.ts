/**
 * Calculate the distance between two points on the Roblox grid.
 * 
 * @param pointA - The first point as [x, y].
 * @param pointB - The second point as [x, y].
 * @returns The distance as a number.
 */
function calculateDistance(pointA: [number, number], pointB: [number, number]): number {
    const [x1, y1] = pointA;
    const [x2, y2] = pointB;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Checks if a given value is a valid Roblox instance.
 * 
 * @param value - The value to check.
 * @returns True if the value is an instance, false otherwise.
 */
function isRobloxInstance(value: any): value is Instance {
    return value && typeof value === 'object' && 'IsA' in value;
}

/**
 * Generates a random color for Roblox objects.
 * 
 * @returns An object containing RGB values.
 */
function getRandomColor(): { r: number; g: number; b: number } {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    };
}

export { calculateDistance, isRobloxInstance, getRandomColor };