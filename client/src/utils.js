const storage = {
  set(name, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(name, jsonValue);
  },

  get(name, substitute = null) {
    const storageValue = JSON.parse(localStorage.getItem(name) || substitute);
  
    return storageValue;
  },

  del(name) {
    localStorage.removeItem(name);
  }

};


function generaterandomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
};

function generateSet(min, max, length) {
  const set = new Set();

  while (set.size < length) {
      const randomNumber = generaterandomInteger(min, max - 1);
      set.add(randomNumber);
  }

  return set;
};
  

      
  


 



export const utils = {
  storage,
  generateSet
}