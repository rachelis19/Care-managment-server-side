import { Injectable, Logger } from '@nestjs/common'
import { Distribution } from '../distribution/distribution.schema'
import { LocationIqService } from '../locationIq/locationIq.service'
import { UserService } from '../user/user.service'
import  { haversine } from 'haversine'
import { LocationIqDto } from '../locationIq/locationIq.dto'
import { UserType } from 'src/core/config/enums'

const kmeans = require('node-kmeans')

@Injectable()
export class DivisonService{

    logger = new Logger(DivisonService.name)

    constructor(private addressService: LocationIqService,
                private userService: UserService){}
 
    public async packages(distributions: Distribution[]){
        this.logger.log('Recivied request to create clusters for distributions')

        const numOfVolunteers = await this.userService.numOfUsers(UserType.Volunteer)

        const k = Math.ceil(distributions.length / numOfVolunteers)

        this.logger.log(`Creating ${k} clusters`)

        const addresses = distributions.map(distribution=> distribution.address) 

        const landmarkVec = await this.convertAddressToLandmark(addresses)
     
        const clusters = await this.createKClusters(k, landmarkVec)
        
        return clusters

    }

    protected async createKClusters(k: number, locations: number[][]){
        const response = kmeans.clusterize(locations, {k}, (err,res) => {
            if (err) console.error(err)
            return res
          })
        
        return response
    }

    protected async convertAddressToLandmark(addresses: LocationIqDto[]){
        const promises = await addresses.map(address=> {
            return this.addressService.getDetails(address)
        })

        const resolvedAddress = await Promise.all(promises)
        
        return resolvedAddress.map(address=> {return [address.lon, address.lat]})        
    }


    protected async findClosestVolunteer(inputAddress: LocationIqDto){     
       const volunteers = await this.userService.findAll({userType: UserType.Volunteer})
             
       const addresses = volunteers.map(volunteer => volunteer.address) 

       const convertedToLandmark = await this.convertAddressToLandmark(addresses)
       
       const inputLandmark: any = await this.addressService.getDetails(inputAddress)

       return Math.min.apply(Math, convertedToLandmark.map(landmark=>
        haversine({lon: inputLandmark.lon, lat: inputLandmark.lat}, {...landmark})))   
    }
}