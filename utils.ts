import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
    logDir?: string;
    maxSize?: number;
    maxFiles?: number;
}

export class Logger {
    private logFilePath: string;
    private options: LoggerOptions;
    private currentSize: number = 0;

    constructor(options: LoggerOptions = {}) {
        this.options = { logDir: './logs', maxSize: 1048576, maxFiles: 5, ...options };
        const logDir = this.options.logDir;
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        this.logFilePath = path.join(logDir, 'app.log');
        this.setupRotation();
    }

    private setupRotation() {
        const stats = fs.existsSync(this.logFilePath) ? fs.statSync(this.logFilePath) : { size: 0 };
        this.currentSize = stats.size;
        if (this.currentSize >= (this.options.maxSize || 0)) {
            this.rotateLogs();
        }
    }

    private rotateLogs() {
        for (let i = this.options.maxFiles! - 1; i > 0; i--) {
            const oldFile = path.join(this.options.logDir!, `app.log.${i}`);
            const newFile = path.join(this.options.logDir!, `app.log.${i + 1}`);
            if (fs.existsSync(oldFile)) {
                fs.renameSync(oldFile, newFile);
            }
        }
        const archivedLog = path.join(this.options.logDir!, 'app.log.1');
        fs.renameSync(this.logFilePath, archivedLog);
        fs.writeFileSync(this.logFilePath, '', { flag: 'w' });
    }

    public log(message: string) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage);
        this.currentSize += logMessage.length;
        this.setupRotation();
    }
}

const logger = new Logger();
logger.log('Logger initialized');

export default logger;
