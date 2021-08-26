import { Inject, Injectable } from '@nestjs/common'
import { AxiosInstance, AxiosResponse } from 'axios'
import { LocationIqDto } from './locationIq.dto'
import Keys from '../../core/config/keys'

@Injectable()
export class LocationIqService{

    constructor(@Inject('http') private http: AxiosInstance){}
    
    public async getDetails(address: LocationIqDto){
        
        const addressToStr = [address.city, 
                              address.street, 
                              address.numOfBuilding.toString()].join(',')
        try{
            const {data} = await this.http.get('/search.php', {
                params: {key: Keys.location,
                            q: addressToStr,
                            format: 'json'}})

            return data[0]?? {}
        }catch(e){
            console.log(e);
            
        }
        
                                                                                                                    
    }
    
}