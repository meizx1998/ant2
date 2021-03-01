import request from '@/utils/request';
const prefx ='http://192.168.192.133:10110'

export async function getHospitalList(key) {

  return request.get(prefx+`/api/item/hospitals/page?key=${key}&rows=1000`).then(
    (response) => {
      console.log(response);
      return response
    }
  ).catch((err) => {
    console.log(err);
    return err;
  })


}

export async function addHospital(hospital) {
  request.post(prefx+'/api/item/hospitals/add', {data: hospital, requestType: 'form'})
}

export async function deletehospital(id){
  return  request.post(prefx+`/api/item/hospitals/delete/${id}`);
}

export async function updateHospitai(hospital){
  return request.post(prefx+'/api/item/hospitals/update',{data:hospital,requestType:'form'})
}
