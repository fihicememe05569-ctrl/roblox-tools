import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(__dirname, 'logs');
const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_LOG_FILES = 5;

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

class Logger {
    private logFile: string;
    private currentSize: number;

    constructor(logFileName: string) {
        this.logFile = path.join(LOG_DIR, logFileName);
        this.currentSize = this.getLogFileSize();
    }

    private getLogFileSize(): number {
        return fs.existsSync(this.logFile) ? fs.statSync(this.logFile).size : 0;
    }

    private rotateLogs() {
        if (this.currentSize >= MAX_LOG_SIZE) {
            for (let i = MAX_LOG_FILES; i > 0; i--) {
                const oldFile = path.join(LOG_DIR, `log${i}.txt`);
                const newFile = path.join(LOG_DIR, `log${i + 1}.txt`);
                if (fs.existsSync(oldFile)) {
                    fs.renameSync(oldFile, newFile);
                }
            }
            fs.renameSync(this.logFile, path.join(LOG_DIR, 'log1.txt'));
        }
    }

    public log(message: string) {
        this.rotateLogs();
        fs.appendFileSync(this.logFile, `${new Date().toISOString()} - ${message}\n`);
        this.currentSize = this.getLogFileSize();
    }
}

const logger = new Logger('app.log');
export default logger;
