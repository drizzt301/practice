import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Address } from 'src/entities/Address';
import { Banner } from 'src/entities/Banner';
import { Bannergroup } from 'src/entities/Bannergroup';
import { Category } from 'src/entities/Category';
import { ContentEvent } from 'src/entities/ContentEvent';
import { ContentFaq } from 'src/entities/ContentFaq';
import { ContentNotice } from 'src/entities/ContentNotice';
import { ContentQna } from 'src/entities/ContentQna';
import { Coupon } from 'src/entities/Coupon';
import { Emailconfirm } from 'src/entities/Emailconfirm';
import { Method } from 'src/entities/Method';
import { Order } from 'src/entities/Order';
import { OrderOption } from 'src/entities/OrderOption';
import { OrderProducts } from 'src/entities/OrderProducts';
import { Payment } from 'src/entities/Payment';
import { Product } from 'src/entities/Product';
import { ProductImage } from 'src/entities/ProductImage';
import { ProductOption } from 'src/entities/ProductOption';
import { Refund } from 'src/entities/Refund';
import { Review } from 'src/entities/Review';
import { ReviewImage } from 'src/entities/ReviewImage';
import { Socialaccount } from 'src/entities/Socialaccount';
import { Socialtoken } from 'src/entities/Socialtoken';
import { State } from 'src/entities/State';
import { Users } from 'src/entities/Users';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Address,
    Banner,
    Bannergroup,
    Category,
    ContentEvent,
    ContentFaq,
    ContentNotice,
    ContentQna,
    Coupon,
    Emailconfirm,
    Method,
    Order,
    OrderOption,
    OrderProducts,
    Payment,
    Product,
    ProductImage,
    ProductOption,
    Refund,
    Review,
    ReviewImage,
    Socialaccount,
    Socialtoken,
    State,
    Users,
  ],

  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  keepConnectionAlive: true,
};

export = config;
