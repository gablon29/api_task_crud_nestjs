import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/Auth/roles.enum';

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);
