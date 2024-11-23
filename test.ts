function map<Input, Output>(
  arr: Input[],
  fn: (arg: Input) => Output
): Output[] {
  return arr.map(fn);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);
