import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export default class JwtModuleConfig {
  static getOrmConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: configService.get('JWT_SECRETKEY'),

      signOptions: { expiresIn: configService.get('JWT_EXPIRESIN') },
    };
  }
}

export const JwtModuleAsyncConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
    JwtModuleConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
