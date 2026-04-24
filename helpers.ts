/**
 * Calculates the distance between two points on the Roblox game world.
 *
 * @param pointA - The first point as a Vector3.
 * @param pointB - The second point as a Vector3.
 * @returns The distance as a number.
 */
function calculateDistance(pointA: Vector3, pointB: Vector3): number {
    return (pointB.sub(pointA)).magnitude;
}

/**
 * Checks if a player has a specific tool in their backpack.
 *
 * @param player - The player to check the inventory of.
 * @param toolName - The name of the tool to look for.
 * @returns True if the tool is found, otherwise false.
 */
function hasTool(player: Player, toolName: string): boolean {
    return player.Backpack.GetChildren().some((tool) => tool.Name === toolName);
}

/**
 * Generates a random spawn position within specified boundaries.
 *
 * @param min - The minimum boundary as a Vector3.
 * @param max - The maximum boundary as a Vector3.
 * @returns A random Vector3 within the bounds.
 */
function getRandomSpawnPosition(min: Vector3, max: Vector3): Vector3 {
    const x = math.random(min.X, max.X);
    const y = math.random(min.Y, max.Y);
    const z = math.random(min.Z, max.Z);
    return new Vector3(x, y, z);
}

export { calculateDistance, hasTool, getRandomSpawnPosition };