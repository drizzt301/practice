import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { ContentNotice as Content } from 'src/entities/ContentNotice';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    // AuthModule
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
