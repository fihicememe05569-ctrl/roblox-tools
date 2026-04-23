import { User } from './types';

export class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
        console.log(`User ${user.name} added.`);
    }

    getUserById(userId: string): User | undefined {
        return this.users.find(user => user.id === userId);
    }

    removeUser(userId: string): void {
        this.users = this.users.filter(user => user.id !== userId);
        console.log(`User with id ${userId} removed.`);
    }

    listUsers(): User[] {
        console.log('Listing users...');
        return this.users;
    }

    clearUsers(): void {
        this.users = [];
        console.log('All users cleared from service.');
    }
}

const userService = new UserService();

export default userService;
