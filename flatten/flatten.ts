
type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
    let results:Array<any>  = [];
    if(value.length === 0) return results;

    for(let i = 0; i<value.length; i++){
        if(Array.isArray(value[i])){
            results = [...results, ...flatten(value[i])];
        }else{
            results.push(value[i]);
        }

    }
    
    return results;

}