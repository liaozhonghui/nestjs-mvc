import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRecordService } from './record/record.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRecordService],
  exports: [UserService, UserRecordService],
})
export class UserModule {}
