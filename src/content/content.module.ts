import { Module } from '@nestjs/common';
import { QnasController } from './qnas/qnas.controller';
import { QnasService } from './qnas/qnas.service';
import { NoticesController } from './notices/notices.controller';
import { NoticesService } from './notices/notices.service';
import { FaqsController } from './faqs/faqs.controller';
import { FaqsService } from './faqs/faqs.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentNotice as Notice } from 'src/entities/ContentNotice';
import { ContentQna as Qna } from 'src/entities/ContentQna';
import { ContentFaq as Faq } from 'src/entities/ContentFaq';
import { ContentEvent as Event } from 'src/entities/ContentEvent';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice, Qna, Faq, Event]),
    // AuthModule
  ],
  controllers: [
    QnasController,
    NoticesController,
    FaqsController,
    EventsController,
  ],
  providers: [QnasService, NoticesService, FaqsService, EventsService],
})
export class ContentModule {}
