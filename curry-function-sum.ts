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

 const curry = (func: Function): Function => {
   const inner = (...args: any): Function =>{
    if(args.length >= func.length){
      return func(...args);
    }

     const outer = (...nextArgs: any) =>{
      return inner(...args, ...nextArgs);
    }

    return outer;
   }

   return inner;
}