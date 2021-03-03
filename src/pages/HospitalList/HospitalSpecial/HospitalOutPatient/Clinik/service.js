import request from "@/utils/request";
import {prefix} from "@/utils/NetWork"

export async function getClinics(hid,sid,oid){
  return request.get(prefix+`/api/item/clinic/getClinic/${hid}/${sid}/${oid}`);
}
