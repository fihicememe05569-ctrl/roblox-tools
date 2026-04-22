function formatRobloxData(data: any[]): string[] {
    return data.map(item => {
        return `ID: ${item.id}, Name: ${item.name}, Type: ${item.type}`;
    });
}

function filterRobloxData(data: any[], filterFunc: (item: any) => boolean): any[] {
    return data.filter(filterFunc);
}

function mergeRobloxData(...dataArrays: any[][]): any[] {
    return Array.from(new Set(dataArrays.flat().map(item => item.id)))
               .map(id => dataArrays.flat().find(item => item.id === id));
}

export { formatRobloxData, filterRobloxData, mergeRobloxData };