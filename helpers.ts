// Helper functions for common Roblox operations

// Function to check if a player is part of a specified group
export function isPlayerInGroup(player: Player, groupId: number): boolean {
    return player.IsInGroup(groupId);
}

// Function to get a player's avatar username by UserId
export async function getUsernameFromUserId(userId: number): Promise<string> {
    const response = await fetch(`https://api.roblox.com/users/${userId}`);
    const data = await response.json();
    return data.Username;
}

// Function to teleport a player to a specific location
export function teleportPlayer(player: Player, position: Vector3): void {
    player.Character?.SetPrimaryPartCFrame(CFrame.new(position));
}

// Function to create a new part in the workspace
export function createPart(size: Vector3, color: Color3, position: Vector3): Part {
    const part = Instance.new('Part');
    part.Size = size;
    part.Color = color;
    part.Position = position;
    part.Anchored = true;
    part.Parent = workspace;
    return part;
}

// Function to set visibility of an object
export function setObjectVisibility(object: Instance, isVisible: boolean): void {
    object.Transparency = isVisible ? 1 : 0;
    object.CanCollide = !isVisible;
}