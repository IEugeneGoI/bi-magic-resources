export const getTotal = (inst, data) => {
    if (!data || !data[inst]) return 0;
    return Object.values(data[inst]).reduce((sum, val) => sum + val, 0);
};

export const getInstances = (data) => {
    if (!data) return [];
    return Object.keys(data).filter((key) => key !== "title" && key !== "norm");
};

export const getComponents = (data, instances) => {
    if (!data || instances.length === 0) return [];
    return Object.keys(data[instances[0]]);
};
