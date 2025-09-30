export default function listFormat(
  items: string[],
  options?: { sorted?: boolean; length?: number; unique?: boolean  }): string {
    let filterArray = items.filter((val)=> val);
    if(filterArray.length === 0) {
      return '';
    }
    
    if(options?.sorted){
        filterArray.sort();
    }

    if(options?.unique){
        filterArray = [...new Set(filterArray)];
    }
    // let's handle when there less or equal to two elements in the array
    if(filterArray.length === 0) return ''
    if(filterArray.length === 1) return filterArray[0];
    if(filterArray.length === 2) return `${filterArray[0]} and ${filterArray[1]}`;
    // two remaining case where we have a number and when we don't have a number
    if(options?.length && length > 0){
        const restOfArray = filterArray.length - options.length;
        if(restOfArray >= 0){
            const beginArray = filterArray.slice(0, options.length).join(', ');
            const other = restOfArray > 1 ? `${restOfArray} others` : `1 other`;
            return `${beginArray}, ${other}`;
        }
    }

    const lastTwo = filterArray.slice(-2).join(' and ');
    const begin = filterArray.slice(0, -2).join(', ');


    return `${begin}, ${lastTwo}`;
}
