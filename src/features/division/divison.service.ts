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

    constructor(private userService: UserService,
                private recipientService: RecipientService){}
 
    public async distributions(divisonRequest: DivisonDto){
        this.logger.log('Recivied request to create clusters for distributions')

        const numOfVolunteers = await this.userService.numOfUsers(UserType.Volunteer)

        const k = numOfVolunteers 

        this.logger.log(`Creating ${k} clusters`)

        const promises = await divisonRequest.packages.map(pack=>
             this.recipientService.find(pack.recipientEmail))
        
        const resolved = await Promise.all(promises)
        
        const landmarkVec = resolved.map(recipient=> 
            {return [recipient.address.lat, recipient.address.lon]})
        
        const groups = await this.createKClusters(k, landmarkVec)
     
        const packages = groups.map(element=> 
            { return  { centroId: element.centroId,
                        pacages:element.clusterInd.map(index=>
                    {return divisonRequest.packages.filter(pack=> pack.recipientEmail === resolved[index].email)[0]}) }
           })
           
        const distributions = packages.map(pack=> {return  {
            adminEmail: divisonRequest.adminEmail,
            date : divisonRequest.date,
            isDelivered: false,
            packages: pack.pacages,
            centroId: pack.centroId
        }})

       return distributions
    }

    public async findClosestVolunteer(email: string){       
       this.logger.log(`Recivied request finding closest volunteer to input address`)

       const address = await (await this.recipientService.find(email)).address

       const volunteers = await this.userService.findAll({userType: UserType.Volunteer})
             
       const addresses = volunteers.map(volunteer => volunteer.address) 

       const landmarks = addresses.map(address=> {return {lat: address.lat, lon: address.lon}})
          
        const zipped = zip([volunteers, landmarks])
          
       const haversines = zipped.map(element=> {
                          return { volunteer: element[0], distance: haversine(
                                             address.lat, 
                                             address.lon, element[1].lat, element[1].lon)}})       
        
        haversines.sort((a, b) =>  a.distance - b.distance)     
        return haversines[0].volunteer.email
         
    } 
    
    
    protected async createKClusters(k: number, locations: number[][]): Promise<any>{
            
        const response = await kmeans.clusterize(locations, {k}, (err,res) => {
            if (err) console.error(err)
            return res
          })
    
        
        return response.groups.map(group=> {
            return {cluster: group.cluster,
                    centroId: group.centroid,
                    clusterInd: group.clusterInd}
        })
    }
}                             
    
                                            
                
       
