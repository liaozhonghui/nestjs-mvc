import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('public.user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  user_id: string;
  @Column()
  language: string;
  @Column()
  current_language: string;
  @Column()
  origin_language: string;
  @Column()
  ip: string;
  @Column()
  ip_country_code: string;
  @Column()
  first_ip: string;
  @Column()
  first_ip_country_code: string;
  @Column()
  register_time: number;
  @Column()
  recent_view_time: number;
  @Column()
  is_deleted: boolean;
  @Column()
  create_time: number;
  @Column()
  delete_time: number;
  @Column()
  last_active_time: number;
  @Column()
  activedays: number;
  @Column()
  user_consecutive_active_days: number;
  @Column()
  last_checkin_date: string;
  @Column()
  consecutive_checkin_days: number;
  @Column({ type: 'jsonb' })
  subscription: any;
  @Column()
  subscription_times: number;
  @Column()
  login_time: number;
  @Column({ type: 'text', array: true })
  user_category_ids: string[];
  @Column()
  index_id: string; // 唯一标记索引

  @Column()
  device_id: string;
  @Column()
  bind_type: string;
  @Column()
  bind_id: string;
  @Column({ type: 'jsonb' })
  bind_info: any;
  @Column()
  nickname: string;
  @Column()
  avatar: string;
  @Column()
  device_brand: string;
  @Column()
  device_model: string;
  @Column()
  os: string;
  @Column()
  os_version: string;
  @Column()
  client_version: string;
  @Column()
  carrier: string;
  @Column()
  mac: string;
  @Column()
  imei: string;
  @Column()
  time_zone: string;
  @Column()
  app_id: string;
  @Column()
  install_time: number;
  @Column()
  android_id: string;
  @Column()
  ga_id: string;
  @Column()
  simulator: boolean;
  @Column()
  firebase_token: string;
}
