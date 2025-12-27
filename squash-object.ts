export const SquashObject = (obj: Object): Object =>{
    return SquashObjectRecurs(obj, "", {});
}

const SquashObjectRecurs = (obj: Object, parentKey: string, res: Record<string, any>): Object => {
    for(const[key, val] of Object.entries(obj)){
        let newKey;
        if(key === ''){
            newKey = parentKey;
        }else{
            newKey = parentKey ? `${parentKey}.${key}`: key;
        }

        if(typeof obj ==='object' && val !== null){
            SquashObjectRecurs(val, newKey, res);
        }else{
            res[newKey] = val; 
        }
    }

    return res; 
}