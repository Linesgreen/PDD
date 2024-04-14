import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  private readonly superAdminLogin: string;
  private readonly superAdminPassword: string;

  constructor() {
    this.superAdminLogin = process.env.SUPER_ADMIN_LOGIN;
    this.superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
  }

  canActivate(context: ExecutionContext): boolean {
    this._checkENV();

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const authHeader = headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const base64Credentials = authHeader.split(' ')[1];
    const { username, password } = this._getUserNameAndPassword(base64Credentials);

    if (username === this.superAdminLogin && password === this.superAdminPassword) {
      return true;
    }

    throw new UnauthorizedException('Wrong su credentials');
  }

  private _checkENV(): void {
    if (!this.superAdminLogin || !this.superAdminPassword) {
      throw new Error('SUPER_ADMIN_LOGIN and SUPER_ADMIN_PASSWORD environment variables must be set');
    }
  }

  private _getUserNameAndPassword(base64Credentials: string): { username: string; password: string } {
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return { username, password };
  }
}
