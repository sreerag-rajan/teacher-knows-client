import {get as _get, isEmpty as _isEmpty} from 'lodash';
import { entityAvailability } from '../../../../Utility/utlity';

export const bulkAddEntityCheck = ({student, classe, index})=> {
  return new Promise ((resolve, reject) => {
    const {rollNumber, classId} = student;
    try{
      const response = entityAvailability({route:'/student/check-entity-availablity', payload: {rollNumber, classId}})
        .then(res => {
          if(res.status == 200){
            const check = classe.filter((el, i) => {
              if(el.rollNumber === rollNumber && el.classId === classId && i!==index)
                return el;
            })
      
            if(!_isEmpty(check)) {
              // setError({...error, rollNumber: {state: true, message: "A Student with this roll number and class is present within this form"}});
              return {error: true, errorBody:{rollNumber : {state: true, message: "A Student with this roll number and class is present within this form"}}}
            }
            else
              return {error: false, errorBody :{rollNumber : {state: false, message: ""}}}
          }
        })
        .catch(()=>{
          return {error: true, errorBody:{rollNumber : {state: true, message: "A Student with this roll number and class is present within this form"}}}
        })

        resolve(response);

    }
    catch(er){
      reject(er)

    }
  })
  
}