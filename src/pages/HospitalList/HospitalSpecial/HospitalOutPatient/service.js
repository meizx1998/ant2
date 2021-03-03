import request from "@/utils/request";
import {prefix} from "@/utils/NetWork"

export async function getoutPatient(hid,sid){
  return request.get(prefix+`/api/item/outpatient/getOutpatient/${hid}/${sid}`);
}
