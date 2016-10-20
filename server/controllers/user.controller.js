/**
 * Created by alina on 20.10.16.
 */
import User from '../models/user';
import cuid from 'cuid';
import serverConfig from '../config';
import jwt from 'jwt-simple';
import { generateRandomToken, sha512 } from '../util/security';

export function create(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  } else {
    let newUser = new User(req.body.user);
    newUser.cuid = cuid();
    newUser.password_salt = generateRandomToken();
    newUser.password = sha512(newUser.password, newUser.password_salt);

    let payload = { sub: newUser.cuid };

    User.findOne({ email: newUser.email })
      .then((emailUser) => {
        if (emailUser) {
          res.status(403).end();
        } else {
          return newUser.save();
        }
      })
      .then(user => {
        let token = jwt.encode(payload, serverConfig.JWT_TOKEN);
        res.json({ token: token, userName: user.name, admin: false });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

export function updateUserProfile(req, res) {
  if (!req.body) {
    res.status(403).end();
  } else {
    let userCuid = jwt.decode(req.headers.authorization.replace('JWT ', ''), serverConfig.JWT_TOKEN).sub;
    User.findOne({cuid: userCuid})
      .then(user => {
        user.name = req.body.name;
        return user.save();
      })
      .then(saved => {
        res.json({email: saved.email, name: saved.name});
      })
      .catch(err=> {
        res.status(500).send(err);
      });
  }
}


export function getUserProfile(req, res) {
  let userCuid = jwt.decode(req.headers.authorization.replace('JWT ', ''), serverConfig.JWT_TOKEN).sub;
  User.findOne({cuid: userCuid})
    .then(user => {
      res.json({email: user.email, name: user.name});
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}
