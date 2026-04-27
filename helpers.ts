function waitForChild(parent: Instance, name: string, timeout: number = 10): Promise<Instance> {
    return new Promise((resolve, reject) => {
        const child = parent.FindFirstChild(name);
        if (child) return resolve(child);

        const disconnect = parent.ChildAdded.Connect((addedChild) => {
            if (addedChild.Name === name) {
                disconnect();
                resolve(addedChild);
            }
        });

        let elapsed = 0;
        const interval = setInterval(() => {
            elapsed += 1;
            if (elapsed >= timeout) {
                clearInterval(interval);
                disconnect();
                reject(new Error(`Child '${name}' not found in ${parent.Name} within ${timeout} seconds`));
            }
        }, 1000);
    });
}

function debounce(fn: Function, delay: number): Function {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}