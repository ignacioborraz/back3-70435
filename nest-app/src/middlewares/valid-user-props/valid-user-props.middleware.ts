import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ValidUserPropsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const { email, password } = req.body;
    if (!email || !password) {
      throw new HttpException('Invalid Fields', 400);
    }
    next();
  }
}
