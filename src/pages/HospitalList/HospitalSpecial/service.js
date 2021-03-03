import request from "@/utils/request";
import {prefix} from "@/utils/NetWork"
export async function getSpecialByHospitalId(id){

  return request.get(prefix+`/api/item/hospitals/hid/${id}`)
}

export async function addHospitalSpecial(hid,sid){
  return request.post(prefix+`/api/item/hospitals/addSpecial/${hid}/${sid}`)
}
