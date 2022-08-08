import axios from '../config/axiosInstance'


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
