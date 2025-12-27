const currySum = (a: number) => {
    let sum = a;

    const inner = (b: number): any => {
        if (!b) {
            return sum;
        }
        sum += b;
        return inner;
    };
    return inner;
}

console.log(currySum(1)(2)(3)()); // 6