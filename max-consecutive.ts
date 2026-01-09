export const maxConsecutive = (arr: Array<number>): number => {
    arr = arr.sort((a, b)=> a-b);
    arr = [...new Set(arr)];
    // console.log('arr', arr);
    let maxCount = 0;
    let counter = 1;
    for(let i=0; i<arr.length-1; i++){
        // console.log(arr[i]+1, arr[i+1], arr[i]+1 === arr[i+1]);
        if(arr[i]+1 === arr[i+1]){
            counter++;
        }else{
            // console.log('maxCount ', maxCount, 'counter ', counter);
            maxCount = Math.max(maxCount, counter);
            counter = 1;
        }
    }


    return Math.max(maxCount, counter);
}

console.log('result:', maxConsecutive([0,3,7,2,5,8,4,6,0,1]));
console.log('result:', maxConsecutive([100,4,200,1,3,2]));
console.log('result:', maxConsecutive([1,0,1,2]));

export const maxConsecutiveSimplified = (arr: Array<number>): number => {
    const numSet = new Set(arr);
    let maxCount = 0;

    for(const num of numSet){
        // only start counting if 'num - 1' is not in the set
        if(!numSet.has(num - 1)){
            let currentNum = num;
            let counter = 1;

            while(numSet.has(currentNum + 1)){
                currentNum++;
                counter++;
            }

            maxCount = Math.max(maxCount, counter);
        }
    }

    return maxCount;
}

