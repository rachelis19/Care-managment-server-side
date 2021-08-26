import { Injectable, Logger } from '@nestjs/common'
import { Distribution } from '../distribution/distribution.schema'
import { LocationIqService } from '../locationIq/locationIq.service'
import { UserService } from '../user/user.service'
import { LocationIqDto } from '../locationIq/locationIq.dto'
import { UserType } from '../../core/config/enums'
import { zip } from '../../core/utilities/zip'
import haversine from '../../core/utilities/haversine'
const kmeans = require('node-kmeans')

@Injectable()
export class DivisonService{

    logger = new Logger(DivisonService.name)

    constructor(private locationIqService: LocationIqService,
                private userService: UserService){}
 
    public async packages(distributions: Distribution[]){
        this.logger.log('Recivied request to create clusters for distributions')

        const numOfVolunteers = await this.userService.numOfUsers(UserType.Volunteer)

        const k = Math.ceil(distributions.length / numOfVolunteers)

        this.logger.log(`Creating ${k} clusters`)

        const addresses = distributions.map(distribution=> distribution.address) 

        const landmarkVec = await this.convertAddressToLandmark(addresses)
     
        const groups = await this.createKClusters(k, landmarkVec)
        
        const zipped = groups.map(group=> zip([group.cluster, group.clusterInd]))

        return zipped.map(zippedGroup=> zippedGroup.map(cluster=> { 
            return {lat: cluster[0][0], 
                    lot: cluster[0][1],
                    address: addresses[cluster[1]]}
            })
        )
    }

    protected async createKClusters(k: number, locations: number[][]): Promise<any>{
        
        console.log(location);
        
        const response = kmeans.clusterize(locations, {k}, (err,res) => {
            if (err) console.error(err)
            return res
          })
        
        console.log(response);
        
        return response.groups.map(group=> {
            return {cluster: group.cluster,
                    clusterInd: group.clusterInd}
        })
    }

    protected async convertAddressToLandmark(addresses: LocationIqDto[]){
        const promises = await addresses.map(address=> {
            return this.locationIqService.getDetails(address)
        })     

        const resolvedAddress = await Promise.all(promises)
        
        return resolvedAddress.map(address=> {return [address.lat, address.lon]})        
    }


    public async findClosestVolunteer(inputAddress: LocationIqDto){       
       this.logger.log(`Recivied request finding closest volunteer to input address`)
       
       const volunteers = await this.userService.findAll({userType: UserType.Volunteer})
             
       const addresses = volunteers.map(volunteer => volunteer.address) 

       const convertedToLandmark = await this.convertAddressToLandmark(addresses)
       
       const zipped = zip([volunteers, convertedToLandmark])

       const inputLandmark: any = await this.locationIqService.getDetails(inputAddress)

       return zipped.map((volunteer, landmark)=> {
                return {volunteer,
                        distance: haversine(inputLandmark.lat, 
                                            inputLandmark.lon, 
                                            landmark[0], 
                                            landmark[1])}
                })
    }   
}