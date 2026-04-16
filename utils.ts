import * as fs from 'fs';
import * as path from 'path';

class Logger {
    private logDir: string;
    private maxFileSize: number;
    private logFilePath: string;

    constructor(logDir: string, maxFileSize: number) {
        this.logDir = logDir;
        this.maxFileSize = maxFileSize;
        this.logFilePath = path.join(logDir, 'app.log');
        this.ensureLogDir();
    }

    private ensureLogDir(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    public log(message: string): void {
        this.checkFileSize();
        const timestamp = new Date().toISOString();
        fs.appendFileSync(this.logFilePath, `${timestamp} - ${message}\n`);
    }

    private checkFileSize(): void {
        const stats = fs.statSync(this.logFilePath);
        if (stats.size > this.maxFileSize) {
            this.rotateLogs();
        }
    }

    private rotateLogs(): void {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const archivedLogPath = path.join(this.logDir, `app-${timestamp}.log`);
        fs.renameSync(this.logFilePath, archivedLogPath);
        this.ensureLogDir();
        fs.writeFileSync(this.logFilePath, '');
    }
}

const logger = new Logger('./logs', 1024 * 1024); // 1 MB size limit
export default logger;