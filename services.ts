import * as fs from 'fs';
import * as path from 'path';

class Logger {
    private logDir: string;
    private logFile: string;
    private maxFileSize: number;

    constructor(logDir: string, logFile: string, maxFileSize: number = 5 * 1024 * 1024) {
        this.logDir = logDir;
        this.logFile = path.join(logDir, logFile);
        this.maxFileSize = maxFileSize;
        this.checkLogDir();
    }

    private checkLogDir() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    public log(message: string) {
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        this.rotateLogs();
        fs.appendFileSync(this.logFile, logMessage);
    }

    private rotateLogs() {
        const stats = fs.statSync(this.logFile);
        if (stats.size >= this.maxFileSize) {
            const newLogFile = `${this.logFile}.${new Date().toISOString().split('T')[0]}`;
            fs.renameSync(this.logFile, newLogFile);
        }
    }
}

const logger = new Logger('./logs', 'app.log');
export default logger;
