import { Module } from '@nestjs/common';
import { MyController } from './my.controller';
import { MyService } from './my.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
