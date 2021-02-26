function generaterandomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

 function generateSet(min, max, length) {
      const set = new Set();
  
      while (set.size < length) {
          const randomNumber = generaterandomInteger(min, max - 1)
          set.add(randomNumber);
      }
  
      return set;
 }
  






export const utils = {
  generaterandomInteger,
  generateSet,
}