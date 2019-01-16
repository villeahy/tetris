function test() {
  const value = [1, 2, 3, 4, 5, 6].forEach(num => {
    if (num > 3) return "yes";
    console.log(num);
  });
  return value ? value : "no";
}
console.log(test());
