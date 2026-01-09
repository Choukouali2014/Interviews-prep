type Tree = {
  val: number;
  left: Tree | null;
  right: Tree | null;
};

const isSameTree = (p: Tree | null, q: Tree | null): boolean => {
  if (p === null && q === null) return true;
  if (p === null || q === null) return true;

  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

// check if a subset of a tree

const subset = (p: Tree | null, t: Tree | null): boolean=>{
    if(t === null ) return true;
    if(p===null) return false;

    if(isSameTree(p,t)) return true;

    return subset(p.left, t) || subset(p.right, t); 
}


const depth = (t: Tree | null): number => {
    if(t === null) return 0;
    return 1 + Math.max(depth(t.left), depth(t.right));
}