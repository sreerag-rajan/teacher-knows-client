import axios from '../config/axiosInstance'

export const debounce = (func, delay)=>{
  let timer;
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(func(), delay);
  }
}

export const entityAvailability = ({route, payload}) =>{
  return new Promise((resolve, reject) => {
    axios.post(`${route}`, payload)
    .then((res)=> {
      resolve({status:200})
    })
    .catch((er) => {
      reject({status: 400})
    });
  })
}
