import { Inject, Injectable } from '@nestjs/common'
import { AxiosInstance, AxiosResponse } from 'axios'
import { AddressDto } from './address.dto'
import Keys from '../../core/config/keys'

@Injectable()
export class AddressService{

    constructor(@Inject('http') private http: AxiosInstance){}
    
    public async getDetails(address: AddressDto){

        const addressToStr = [address.city, 
                              address.street, 
                              address.numOfBuilding.toString()].join(',')
        
        const {data} = await this.http.get('/search.php', {
                                            params: {key: Keys.LOCATION,
                                                        q: addressToStr,
                                                        format: 'json'}})
        
        return data[0]
                                                                                                                    
    }
    
}