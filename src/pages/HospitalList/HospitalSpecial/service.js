import request from "@/utils/request";
import {prefix} from "@/utils/NetWork"
export async function getSpecialByHospitalId(id){
  console.log(prefix,prefix)
  return request.get(prefix+`/api/item/hospitals/hid/${id}`)
}
