export const getInstances = (data) => {
  if (!data || typeof data !== "object") return [];
  return Object.keys(data).filter((key) => key !== "title" && key !== "norm");
};

export const getComponents = (data, instances) => {
  if (!data || instances.length === 0) return [];
  return Object.keys(data[instances[0]]);
};

export const getTotal = (data, inst) => {
  if (!data || !data[inst] || typeof data[inst] !== 'object') return 0;
  return Object.values(data[inst]).reduce((sum, val) => sum + val, 0);
};
