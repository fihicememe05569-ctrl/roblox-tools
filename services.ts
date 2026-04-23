import { User } from './types';

class UserService {
    private users: User[] = [];

    public addUser(user: User): void {
        if (this.isUserValid(user)) {
            this.users.push(user);
        } else {
            throw new Error('Invalid user data');
        }
    }

    public getUser(id: string): User {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new Error(`User not found with id: ${id}`);
        }
        return user;
    }

    private isUserValid(user: User): boolean {
        return user && typeof user.id === 'string' && typeof user.name === 'string';
    }
}

export default new UserService();