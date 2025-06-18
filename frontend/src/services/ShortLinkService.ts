import { CreateShortLinkRequest } from "../types/CreateShortLinkRequest";
import { CreateShortLinkresponse } from "../types/CreateShortLinkrRsponse";
import { ShortLink } from "../types/model/ShortLink";
import { ShortLinkInfoResponse } from "../types/ShortLinkInfoResponse";
import ShortLinkInterface from "./interfaces/ShortLinkInterface";


export class ShortLinkService implements ShortLinkInterface {
    
    urlService: string;

    constructor(serverUrl:string) {
        this.urlService = serverUrl;  
    }


    async getAll(): Promise<ShortLink[]> {
        const response = await fetch(`${this.urlService}/all`, {
            method: 'GET' 
        });
                
         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get all short links:');
        }
                
        const data:ShortLink[] = await response.json();
            
        return data;
    }


    async createShortLink(newShortLink: CreateShortLinkRequest): Promise<CreateShortLinkresponse> {
        const response = await fetch(`${this.urlService}/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShortLink),
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create short link');
        }
        
        const data: CreateShortLinkresponse = await response.json();

        return data;
    }

    async deleteShortLink(shortlink: string): Promise<ShortLink> {
         const response = await fetch(`${this.urlService}/delete/${shortlink}`, {
                method: 'DELETE' 
            });
                
         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete short links:');
        }
                
        const data:ShortLink = await response.json();     
        return data;
        
    }

    async getInfo(shortlink: string): Promise<ShortLinkInfoResponse> {

            const response = await fetch(`${this.urlService}/info/${shortlink}`, {
            method: 'GET' 
        });
                
         if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get info short links:');
        }
                
        const data:ShortLinkInfoResponse = await response.json();
            
        return data;
       
    }
    
}