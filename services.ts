type Callback = () => void;

type ServiceMap = {
    [key: string]: { active: boolean; callback: Callback };
};

class ServiceManager {
    private services: ServiceMap = {};

    addService(name: string, callback: Callback): void {
        this.services[name] = { active: true, callback };
    }

    removeService(name: string): void {
        delete this.services[name];
    }

    runActiveServices(): void {
        Object.keys(this.services).forEach(name => {
            const service = this.services[name];
            if (service.active) {
                service.callback();
            }
        });
    }

    toggleService(name: string): void {
        if (this.services[name]) {
            this.services[name].active = !this.services[name].active;
        }
    }

    resetServices(): void {
        Object.keys(this.services).forEach(name => {
            this.services[name].active = false;
        });
    }
}

export const serviceManager = new ServiceManager();