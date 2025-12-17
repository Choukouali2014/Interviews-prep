export const removeDuplicate = (arr: number[]): number[] => {
    return [...new Set(arr)];
}

export const removeDuplicateObjects = <T>(arr: T[]): T[] => {
    // using hash map to track seen objects
    const seen = new Map<string, T>();
    arr.forEach(item => {
        const key = JSON.stringify(item);
        if (!seen.has(key)) {
            seen.set(key, item);
        }
    });
    return Array.from(seen.values());
}