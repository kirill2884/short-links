import { AnalyticsResponse } from "../types/analitycs/AnalitycsResponse";
import AnalyticsInterface from "./interfaces/AnaliticsInterface";

export class AnalyticsService implements AnalyticsInterface {


    urlService: string;

    constructor(serverUrl:string) {
        this.urlService = serverUrl;  
    }

   
    async getAnalitics(shortlink: string): Promise<AnalyticsResponse> {
        const response = await fetch(`${this.urlService}/analytics/${shortlink}`, {
            method: 'GET' 
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get analitics for short link:' + shortlink);
        }
        
        const data:AnalyticsResponse = await response.json();
        console.log(data);
        return data;
    }

    
}