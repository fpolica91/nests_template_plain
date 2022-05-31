import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Password
import { AuthGuard } from '@nestjs/passport';

// RxJs
import { Observable, of } from 'rxjs';
import { map, mergeMap, takeWhile, tap } from 'rxjs/operators';

// Services
import { UsersService } from '../users/users.service';

// Models
import { UserFromJwt } from './models/UserFromJwt';
import { AuthRequest } from './models/AuthRequest';

// Decorators
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    // return true;

    return of(canActivate).pipe(
      mergeMap((value) => value),
      takeWhile((value) => value),
      map(() => context.switchToHttp().getRequest<AuthRequest>()),
      mergeMap((request) =>
        of(request).pipe(
          map((req) => {
            if (!req.user) {
              throw Error('User was not found in request.');
            }

            return req.user;
          }),

          mergeMap(
            (userFromJwt: UserFromJwt) =>
              this.userService.findById(
                userFromJwt.userId,
              ) as unknown as Observable<any>,
          ),
          tap((user) => {
            request.principal = user as any;
          }),
        ),
      ),
      map((user) => Boolean(user)),
    );
  }
}
