export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

const parseValue = (arg: ClassValue) => {
  if (!arg) return "";

  if (typeof arg === "string") {
    return arg;
  }

  if(typeof arg==='number'){
    return arg.toString();
  }

  let arrayValue = "";
  if (Array.isArray(arg)) {
    for (let i = 0; i < arg.length; i++) {
      arrayValue = arrayValue
        ? arrayValue + " " + parseValue(arg[i])
        : parseValue(arg[i]);
    }
    return arrayValue;
  }

  if (typeof arg !== "object") return "";

  let objectValue = "";
  for (const [key, value] of Object.entries(arg)) {
    if ( value) {
      objectValue = objectValue ? objectValue + " " + key : key;
    }
  }
  return objectValue;
};

export default function classNames(...args: Array<ClassValue>): string {
  let classValues = "";
  if (args.length === 0) return classValues;

  for (let i = 0; i < args.length; i++) {
    if (parseValue(args[i])) {
      classValues =  classValues ? classValues + " " + parseValue(args[i]) : parseValue(args[i]) ;
    }
  }

  return classValues;
}
