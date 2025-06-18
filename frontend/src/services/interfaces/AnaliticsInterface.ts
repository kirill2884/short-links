import { AnalyticsResponse } from "../../types/analitycs/AnalitycsResponse";

export default interface AnalyticsInterface {

   getAnalitics(shortlink:string): Promise<AnalyticsResponse>;
}