type DataPoint = {[key: string]: any};

type FilterFunction = (value: any, key: string) => boolean;

/**
 * Filter and map Roblox data using a flexible callback.
 * @param data - The data collection to be processed.
 * @param filterFn - Function to filter the data. Must return true for items to keep.
 * @param mapFn - Function to transform the data items. Must return the new value.
 * @returns An array of the transformed data items.
 */
function processRobloxData(data: DataPoint[], filterFn: FilterFunction, mapFn: (value: any, key: string) => any): any[] {
    return data
        .filter((item, index) => {
            const keys = Object.keys(item);
            return keys.some(key => filterFn(item[key], key));
        })
        .map((item, index) => {
            const keys = Object.keys(item);
            const newItem: DataPoint = {};
            keys.forEach(key => {
                newItem[key] = mapFn(item[key], key);
            });
            return newItem;
        });
}

// Sample usage: 
const sampleData: DataPoint[] = [
    { name: 'Player1', score: 200 },
    { name: 'Player2', score: 300 },
    { name: 'Player3', score: 150 }
];

const results = processRobloxData(sampleData,
    (value) => value > 200,
    (value) => ({ transformedScore: value * 2 })
);
console.log(results); // Output: [ { transformedScore: 600 } ]
