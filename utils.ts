type RobloxData = { id: number; name: string; value: any; };

type RobloxDataHandler = {
    filterById: (data: RobloxData[], id: number) => RobloxData[];
    sortByName: (data: RobloxData[], order?: 'asc' | 'desc') => RobloxData[];
    transformValues: (data: RobloxData[]) => Array<{ id: number; description: string; }>; 
};

const robloxDataHandler: RobloxDataHandler = {
    filterById: (data, id) => data.filter(item => item.id === id),

    sortByName: (data, order = 'asc') => {
        return data.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return order === 'asc' ? (nameA > nameB ? 1 : -1) : (nameA < nameB ? 1 : -1);
        });
    },

    transformValues: (data) => data.map(item => ({ id: item.id, description: `${item.name}: ${item.value}` }))
};

export default robloxDataHandler;
