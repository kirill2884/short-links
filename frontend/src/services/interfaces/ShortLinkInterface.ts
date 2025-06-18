import { CreateShortLinkRequest } from "../../types/CreateShortLinkRequest";
import { CreateShortLinkresponse } from "../../types/CreateShortLinkrRsponse";
import { ShortLink } from "../../types/model/ShortLink";
import { ShortLinkInfoResponse } from "../../types/ShortLinkInfoResponse";

export default interface ShortLinkInterface {

   createShortLink(newShortLink:CreateShortLinkRequest):Promise<CreateShortLinkresponse>;
   getInfo(shortlink:string): Promise<ShortLinkInfoResponse>;
   deleteShortLink(shortlink:string): Promise<ShortLink>
   getAll():Promise<ShortLink[]>
}