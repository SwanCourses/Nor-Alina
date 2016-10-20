/**
 * Created by alina on 20.10.16.
 */
import * as AuthController from '../controllers/auth.controller';

export default function (router, protectedMiddleware) {
  router.post('/auth', AuthController.signIn);
  return router;
};
