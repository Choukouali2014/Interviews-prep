export default function debounce(func: Function, wait: number): Function {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  };
}
