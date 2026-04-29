import * as fs from 'fs';
import * as path from 'path';

const logDir = path.join(__dirname, 'logs');
const maxSize = 5 * 1024 * 1024; // 5 MB

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

class Logger {
    private logFile: string;
    private currentSize: number = 0;

    constructor() {
        this.logFile = path.join(logDir, `log-${new Date().toISOString().slice(0, 10)}.txt`);
        this.currentSize = this.getCurrentLogSize();
    }

    private getCurrentLogSize(): number {
        return fs.existsSync(this.logFile) ? fs.statSync(this.logFile).size : 0;
    }

    public log(message: string): void {
        const formattedMessage = `${new Date().toISOString()} - ${message}\n`;
        this.currentSize += Buffer.byteLength(formattedMessage);

        if (this.currentSize >= maxSize) {
            this.rotateLogs();
        }

        fs.appendFileSync(this.logFile, formattedMessage);
    }

    private rotateLogs(): void {
        const dateStamp = new Date().toISOString().slice(0, 10);
        const newLogFile = path.join(logDir, `log-${dateStamp}-${Date.now()}.txt`);
        fs.renameSync(this.logFile, newLogFile);
        this.currentSize = 0;
    }
}

export const logger = new Logger();