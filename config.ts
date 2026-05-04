import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
    logDirectory: string;
    maxSize: number;
    maxFiles: number;
}

const loggerConfig: LoggerConfig = {
    logDirectory: path.join(__dirname, 'logs'),
    maxSize: 5 * 1024 * 1024, // 5 MB
    maxFiles: 5
};

if (!fs.existsSync(loggerConfig.logDirectory)) {
    fs.mkdirSync(loggerConfig.logDirectory);
}

function rotateLogs() {
    const files = fs.readdirSync(loggerConfig.logDirectory);
    if (files.length > loggerConfig.maxFiles) {
        const sortedFiles = files.sort();
        const filesToDelete = sortedFiles.slice(0, sortedFiles.length - loggerConfig.maxFiles);
        filesToDelete.forEach(file => {
            fs.unlinkSync(path.join(loggerConfig.logDirectory, file));
        });
    }
}

function logMessage(message: string) {
    const logFile = path.join(loggerConfig.logDirectory, `log_${new Date().toISOString().split('T')[0]}.txt`);
    fs.appendFileSync(logFile, `${new Date().toISOString()}: ${message}\n`);
    rotateLogs();
}

export { logMessage };