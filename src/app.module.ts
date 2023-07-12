import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { DestinationModule } from './modules/destination/destination.module';
import { MaterialTypeModule } from './modules/material-type/material-type.module';
import { PaperModule } from './modules/paper/paper.module';
import { ProductModule } from './modules/product/product.module';
import { ProviderModule } from './modules/provider/provider.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './shared/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './modules/driver/driver.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ExitModule } from './modules/exit/exit.module';
import { EntryModule } from './modules/entry/entry.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AddressModule,
    ProviderModule,
    DestinationModule,
    CategoryModule,
    PaperModule,
    MaterialTypeModule,
    ProductModule,
    DriverModule,
    VehicleModule,
    ExitModule,
    EntryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
