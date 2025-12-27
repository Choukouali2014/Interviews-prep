// examples
// " 1 + 1" --> 2
// "2 + 2 * 2" --> 6
// "2 + 1 * 2 "--> 4

export const operation =(expr: string) => {
    const newValue = expr.trim().split('+');

    const evaluateChunks = newValue.map((chunk)=>{
        if(chunk.includes("*")){
            return chunk.split('*').reduce((acc, num)=> acc * Number(num), 1);
        }

        return Number(chunk);
    });

    return evaluateChunks.reduce((acc, num)=> acc + num, 0);

};
