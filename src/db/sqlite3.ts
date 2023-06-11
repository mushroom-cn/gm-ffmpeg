import { TypeOrmModule } from '@nestjs/typeorm';

export const getTypeorm = () =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'test.db',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  });
