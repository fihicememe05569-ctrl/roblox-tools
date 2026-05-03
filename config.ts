import fs from 'fs';
import path from 'path';

interface LoggerConfig {
    logDir: string;
    maxSize: number;
    maxFiles: number;
}

class Logger {
    private logDir: string;
    private maxSize: number;
    private maxFiles: number;
    private currentLogFile: string;
    private currentLogStream: fs.WriteStream;

    constructor(config: LoggerConfig) {
        this.logDir = config.logDir;
        this.maxSize = config.maxSize;
        this.maxFiles = config.maxFiles;
        this.currentLogFile = this.getLogFilePath();
        this.currentLogStream = this.createLogStream();
    }

    private getLogFilePath(): string {
        const date = new Date().toISOString().slice(0, 10);
        return path.join(this.logDir, `log-${date}.txt`);
    }

    private createLogStream(): fs.WriteStream {
        return fs.createWriteStream(this.currentLogFile, { flags: 'a' });
    }

    public log(message: string): void {
        this.currentLogStream.write(`${new Date().toISOString()} - ${message}\n`);
        this.checkLogRotation();
    }

    private checkLogRotation(): void {
        const stats = fs.statSync(this.currentLogFile);
        if (stats.size >= this.maxSize) {
            this.rotateLogFiles();
        }
    }

    private rotateLogFiles(): void {
        this.currentLogStream.end();
        for (let i = this.maxFiles; i >= 0; i--) {
            const oldFile = path.join(this.logDir, `log-${(new Date(Date.now() - i * 86400000)).toISOString().slice(0, 10)}.txt`);
            const newFile = path.join(this.logDir, `log-old-${i}.txt`);
            if (fs.existsSync(oldFile)) {
                fs.renameSync(oldFile, newFile);
            }
        }
        this.currentLogFile = this.getLogFilePath();
        this.currentLogStream = this.createLogStream();
    }
}

const loggerConfig: LoggerConfig = {
    logDir: './logs',
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
};

export const logger = new Logger(loggerConfig);