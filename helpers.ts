import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
    logPath: string;
    maxSize: number;
    rotationCount: number;
}

class Logger {
    private logFilePath: string;
    private maxSize: number;
    private rotationCount: number;

    constructor(options: LoggerOptions) {
        this.logFilePath = options.logPath;
        this.maxSize = options.maxSize;
        this.rotationCount = options.rotationCount;
        fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
    }

    private rotateLogs() {
        if (fs.existsSync(this.logFilePath) && fs.statSync(this.logFilePath).size >= this.maxSize) {
            for (let i = this.rotationCount; i > 0; i--) {
                const source = this.logFilePath + '.' + i;
                const destination = this.logFilePath + '.' + (i + 1);
                if (fs.existsSync(source)) {
                    fs.renameSync(source, destination);
                }
            }
            fs.renameSync(this.logFilePath, this.logFilePath + '.1');
        }
    }

    public log(message: string) {
        this.rotateLogs();
        fs.appendFileSync(this.logFilePath, message + '\n');
    }
}

export default Logger;
