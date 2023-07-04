import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { entities } from 'entities/entities';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: configService.get('DATABASE_HOST'),

      port: Number(configService.get('DATABASE_PORT')),

      username: configService.get('DATABASE_USER'),

      password: configService.get('DATABASE_PASSWORD'),

      database: configService.get('DATABASE_DATABASE'),

      entities: [...entities],

      synchronize: true, //  * false

      logging: false,
    };
  }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
