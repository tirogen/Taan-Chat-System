const people = (name: string): string => {
  let i: number = 0, total: number= 0;
  if(name.length === 0) return `/peoples/1.png`;
  for(i = 0; i < name.length; i++){
    total += name.charCodeAt(i);
  }
  return `peoples/${total*11%40+1}.png`
}

const animal = (name: string): string => {
  let i: number = 0, total: number= 0;
  if(name.length === 0) return `/animals/1.jpg`;
  for(i = 0; i < name.length; i++){
    total += name.charCodeAt(i);
  }
  return `animals/${total*11%20+1}.jpg`
}

export {people, animal};
