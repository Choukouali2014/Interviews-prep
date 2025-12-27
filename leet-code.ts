// return the index of the first string in arr that starts with prefix
const findPrefix= (arr: string[], prefix: string): number => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].startsWith(prefix)) {
            return i;
        }
    }
    return -1;
}

const findPrefixIndex = (arr: string[], prefix: string): number => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid].startsWith(prefix)) {
            // Check if it's the first occurrence
            if (mid === 0 || !arr[mid - 1].startsWith(prefix)) {
                return mid;
            }
            right = mid - 1;
        } else if (arr[mid] < prefix) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

//The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values
//For example, for arr = [2,3,4], the median is 3. For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
//Implement the MedianFinder class: MedianFinder() initializes the MedianFinder object. void addNum(int num) adds the integer num from the data stream to the data structure. double findMedian() returns the median of all elements so far.

class MedianFinder {
     private arr: number[]; 

    constructor(){
        this.arr = [];
    }

    addNum = (num: number) => {
        this.arr.push(num);
        this.arr.sort();
    }

    findMedian = () => {
        const n = this.arr.length;
        const mid = Math.floor(n / 2);

        if(n % 2 === 0){
            return (this.arr[mid -1] + this.arr[mid]) / 2;
        }

        return this.arr[mid];
    }

}

//Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
//  Do not return anything, modify nums in-place instead.

const rotate = (nums: number[], k: number): void => {
    const n = nums.length;
    k = k % n;

    // Reverse the entire array
    reverse(nums, 0, n - 1);
    // Reverse the first k elements
    reverse(nums, 0, k - 1);
    // Reverse the remaining elements
    reverse(nums, k, n - 1);
}
const reverse = (nums: number[], start: number, end: number): void => {
    while (start < end) {
        const temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

const mergeIntervals = (intervals: number[][]):number[][] => {
    let res: number[][] = [];
    intervals.sort((a,b)=> a[0]- b[0]);
    for(let i=0; i < intervals.length; i++){
        const curr = intervals[i];
        const next = intervals[i+1];
        
        // check for start
        const start = curr[0] <= next[0] ? curr[0] : next[0];
        const end = curr[0] >= next[0] ? curr[0] : next[0];
        res.push([...[start, end]]);
    }

    return res;
}