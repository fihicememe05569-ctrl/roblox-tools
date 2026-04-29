// Service to manage player sessions in Roblox

interface PlayerSession {
    playerId: string;
    sessionId: string;
    startTime: Date;
    endTime?: Date;
}

class SessionManager {
    private sessions: Map<string, PlayerSession> = new Map();

    /**
     * Starts a new session for a player.
     * @param playerId - Unique identifier for the player.
     * @returns The created PlayerSession object.
     */
    startSession(playerId: string): PlayerSession {
        const sessionId = Math.random().toString(36).substring(2, 15);
        const session: PlayerSession = {
            playerId,
            sessionId,
            startTime: new Date(),
        };
        this.sessions.set(sessionId, session);
        return session;
    }

    /**
     * Ends a session for a player.
     * @param sessionId - Unique identifier for the session.
     * @returns The ended PlayerSession object, or undefined if not found.
     */
    endSession(sessionId: string): PlayerSession | undefined {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.endTime = new Date();
            this.sessions.delete(sessionId);
        }
        return session;
    }

    /**
     * Retrieves all active sessions.
     * @returns An array of PlayerSession objects.
     */
    getActiveSessions(): PlayerSession[] {
        return Array.from(this.sessions.values()).filter(session => !session.endTime);
    }
}

// Example usage
const sessionManager = new SessionManager();
const session = sessionManager.startSession('player123');
console.log(sessionManager.getActiveSessions());
sessionManager.endSession(session.sessionId);
console.log(sessionManager.getActiveSessions());
