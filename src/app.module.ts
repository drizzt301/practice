import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      include: [],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Users]),
    CatModule,
  ],

*/