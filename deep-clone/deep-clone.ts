export default function deepClone<T>(value: T): T {
 
    if (value === null || typeof value !== "object") {      
        return value;
    }

    if (Array.isArray(value)) {
        const arrCopy = [] as any[];
        for (let i = 0; i < value.length; i++) {
            arrCopy[i] = deepClone(value[i]);
        }
        return arrCopy as unknown as T;
    }

    const objCopy = {} as { [key: string]: any };
    for (const key in value) {               
        if ((value as Object).hasOwnProperty(key)) {
            objCopy[key] = deepClone((value)[key]);
        }
    }
    return objCopy as T;
}