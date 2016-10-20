/**
 * Created by alina on 20.10.16.
 */
import * as UserController from '../controllers/user.controller';

export default function (router, protectedMiddleware) {
  router.post('/users/registration', UserController.create);
  router.get('/users/profile', protectedMiddleware, UserController.getUserProfile);
  router.put('/users/profile', protectedMiddleware, UserController.updateUserProfile);
  return router;
};
