import { Injectable, Logger } from '@nestjs/common'
import { Distribution } from '../distribution/distribution.schema'
import { LocationIqService } from '../locationIq/locationIq.service'
import { UserService } from '../user/user.service'
import { LocationIqDto } from '../locationIq/locationIq.dto'
import { UserType } from '../../core/config/enums'
import { zip } from '../../core/utilities/zip'
import { DivisonDto } from './divison.dto'
import { RecipientService } from '../recipient/recipient.service'
import haversine from '../../core/utilities/haversine'
const kmeans = require('node-kmeans')


@Injectable()
export class DivisonService{

    logger = new Logger(DivisonService.name)

    constructor(private locationIqService: LocationIqService,
                private userService: UserService,
                private recipientService: RecipientService){}
 
    public async distributions(divisonRequest: DivisonDto){
        this.logger.log('Recivied request to create clusters for distributions')

        const numOfVolunteers = await this.userService.numOfUsers(UserType.Volunteer)

        const k = Math.ceil(divisonRequest.packages.length / numOfVolunteers)

        this.logger.log(`Creating ${k} clusters`)

        const promises = await divisonRequest.packages.map(pack=>
             this.recipientService.findRecipientAddress(pack.recipientEmail))
        
        const resolved = await Promise.all(promises)
        
        const landmarkVec = resolved.map(address=> {return [address.lat, address.lon]})
        
        console.log(landmarkVec);
        
        const groups = await this.createKClusters(k, landmarkVec)

        return groups
        
        // const zipped = groups.map(group=> zip([group.cluster, group.clusterInd]))
        

        // return zipped.map(zippedGroup=> zippedGroup.map(cluster=> { 
        //     return {lat: cluster[0][0], 
        //             lot: cluster[0][1],
        //             address: addresses[cluster[1]]}
        //     })
        // )
    }
    
    public async findClosestVolunteer(address: any){       
       this.logger.log(`Recivied request finding closest volunteer to input address`)
       
       const volunteers = await this.userService.findAll({userType: UserType.Volunteer})
             
       const addresses = volunteers.map(volunteer => volunteer.address) 

       const landmarks = addresses.map(address=> {return {lat: address.lat, lon: address.lon}})
          
        const zipped = zip([volunteers, landmarks])
          
       const haversines = zipped.map(element=> {
                          return { volunteer: element[0], distance: haversine(
                                             address.lat, 
                                             address.lon, element[1].lat, element[1].lon)}})       
        
        return haversines.reduce((prev, curr) =>
            prev.distance < curr.distance ? prev : curr
        )
    } 
    
    
    protected async createKClusters(k: number, locations: number[][]): Promise<any>{
            
        const response = await kmeans.clusterize(locations, {k}, (err,res) => {
            if (err) console.error(err)
            return res
          })
        
        console.log(response.groups[0].cluster);
        
        return response.groups.map(group=> {
            return {cluster: group.cluster,
                    clusterInd: group.clusterInd}
        })
    }
}                             
    
                                            
                
       
