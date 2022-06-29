

export const debounce = (func, delay)=>{
  let timer;
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(func(), delay);
  }
}


