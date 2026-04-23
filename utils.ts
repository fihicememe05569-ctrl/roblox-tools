type RobloxData = {[key: string]: any};

function formatRobloxData(data: RobloxData, mappings: {[key: string]: string}): RobloxData {
    const formattedData: RobloxData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const newKey = mappings[key] || key;
            formattedData[newKey] = data[key];
        }
    }
    return formattedData;
}

function filterRobloxData(data: RobloxData, predicate: (value: any, key: string) => boolean): RobloxData {
    return Object.keys(data)
        .filter(key => predicate(data[key], key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {} as RobloxData);
}

function mergeRobloxData(...dataArray: RobloxData[]): RobloxData {
    return dataArray.reduce((merged, current) => {
        return {...merged, ...current};
    }, {} as RobloxData);
}

export { formatRobloxData, filterRobloxData, mergeRobloxData };