import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ChatGateway } from './chat.gateway'
import { LocationIqModule } from './features/locationIq/locationIq.module'
import { DistributionModule } from './features/distribution/distribution.module'
import { DivisonModule } from './features/division/divison.module'
import { RecipientModule } from './features/recipient/recipient.module'
import { UserModule } from './features/user/user.module'
import { AuthModule } from './features/auth/auth.module'
import { ChatModule } from './features/chat/chat.module'
import { BlogModule } from './features/blog/blog.module'
import { ChatService } from './features/chat/chat.service'

const mongooseConnection = 'mongodb+srv://racheliShen:0545581921@cluster0.4jla2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

@Module({
  imports: [MongooseModule.forRoot(mongooseConnection, { useFindAndModify: false }),
            DistributionModule,
            BlogModule,
            ChatModule,
            RecipientModule,
            DivisonModule,  
            LocationIqModule,
            UserModule,
            AuthModule],
  providers: [ChatService, ChatGateway]

})

export class AppModule {}
