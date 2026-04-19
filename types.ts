export type RobloxUser = {
    id: number;
    username: string;
    displayName: string;
};

export function getUserData(userId: number): Promise<RobloxUser | null> {
    return new Promise((resolve, reject) => {
        if (userId <= 0) {
            reject(new Error('Invalid user ID')); // Edge case: Invalid user ID
            return;
        }
        setTimeout(() => {
            const user: RobloxUser | null = userId % 2 === 0 ? { id: userId, username: `User${userId}`, displayName: `User ${userId}` } : null; // Mock fetching user
            if (!user) {
                reject(new Error('User not found')); // Edge case: User does not exist
            } else {
                resolve(user);
            }
        }, 1000);
    });
}

export async function fetchUserData(userId: number): Promise<void> {
    try {
        const user = await getUserData(userId);
        console.log('User data:', user);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}