import { Injectable, Logger } from '@nestjs/common'
import { Distribution } from '../distribution/distribution.schema'
import { AddressService } from '../address/address.service'
import { UserService } from '../user/user.service'
import  { haversine } from 'haversine'
import { AddressDto } from '../address/address.dto'
import { UserType } from 'src/core/config/enums'

const kmeans = require('node-kmeans')

@Injectable()
export class DivisonService{

    logger = new Logger(DivisonService.name)

    constructor(private addressService: AddressService,
                private userService: UserService){}

    public async createKClusters(distributions: Distribution[]){
        this.logger.log('Recivied request to create clusters for distributions')

        const numOfVolunteers = await this.userService.numOfUsers(UserType.Volunteer)

        const k = Math.ceil(distributions.length / numOfVolunteers)

        this.logger.log(`Creating ${k} clusters`)

        const addresses = distributions.map(distribution=> distribution.address) 

        const landmarkVec = await this.convertAddressToLandmark(addresses)
     
        const response = kmeans.clusterize(landmarkVec, {k}, (err,res) => {
            if (err) console.error(err)
            return res
          })
        
        return response
    }

    protected async convertAddressToLandmark(addresses: AddressDto[]){
        const promises = await addresses.map(address=> {
            return this.addressService.getDetails(address)
        })

        const resolvedAddress = await Promise.all(promises)
        
        return resolvedAddress.map(address=> {return [address.lon, address.lat]})        
    }


    protected async findClosestVolunteer(inputAddress: AddressDto){     
       const volunteers = await this.userService.findAll({userType: UserType.Volunteer})
             
       const addresses = volunteers.map(volunteer => volunteer.address) 

       const convertedToLandmark = await this.convertAddressToLandmark(addresses)
       
       const inputLandmark: any = await this.addressService.getDetails(inputAddress)

       return Math.min.apply(Math, convertedToLandmark.map(landmark=>
        haversine({lon: inputLandmark.lon, lat: inputLandmark.lat}, {...landmark})))   
    }
}