export interface RobloxUser { id: number; username: string; avatarUrl: string; }

export function fetchRobloxUser(userId: number): Promise<RobloxUser> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://users.roblox.com/v1/users/${userId}`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve({
                    id: data.id,
                    username: data.name,
                    avatarUrl: `https://www.roblox.com/bust-thumbnail/image?userId=${data.id}&width=420&height=420&format=png`
                });
            } else {
                reject(new Error(`Failed to fetch user with id ${userId}`));
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send();
    });
}

export function formatUserDetails(user: RobloxUser): string {
    return `User: ${user.username} (ID: ${user.id})\nAvatar: ${user.avatarUrl}`;
}

export async function logRobloxUserDetails(userId: number): Promise<void> {
    try {
        const user = await fetchRobloxUser(userId);
        const details = formatUserDetails(user);
        console.log(details);
    } catch (error) {
        console.error(error);
    }
}