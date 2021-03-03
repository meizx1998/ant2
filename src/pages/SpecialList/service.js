import request from '@/utils/request';
const prefx ='http://192.168.192.133:10110'

export async function getSpecialList(key) {

  return request.get(prefx+`/api/item/special/page?key=${key}&rows=1000`).then(
    (response) => {
      console.log(response);
      return response
    }
  ).catch((err) => {
    console.log(err);
    return err;
  })


}

export async function addSpecialList(sepcial) {
  request.post(prefx+'/api/item/special/add', {data: sepcial, requestType: 'form'})
}

export async function deleteSpecialList(id){
  return  request.post(prefx+`/api/item/special/delete/${id}`);
}

export async function updateSpecialList(sepcial){
  return request.post(prefx+'/api/item/special/update',{data:sepcial,requestType:'form'})
}

export async function getOutPaitentsBySepcId(id){
  return request.get(prefx+`/api/item/special/sid/${id}`)
}

export async function addOutPatient(outpatient){
  return request.post(prefx+'/api/item/outpatient/add',{data:outpatient,requestType:'form'})
}

export async function deleteOutPatient(id){
  return request.post(prefx+`/api/item/outpatient/delete/${id}`)
}
