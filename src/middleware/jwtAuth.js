/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import DataSource from '../lib/DataSource.js';

dotenv.config();
// eslint-disable-next-line consistent-return
export const jwtAuth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    // get the payload data out of the token
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);
    const { role } = jwt.verify(token, process.env.TOKEN_SALT);

    const userRepository = DataSource.getRepository('User');
    
    const user = await userRepository.findOne({
      where: { id },
      relations: ['meta', 'role']
    });

    // remove the password from the user object
    user.password = '';

    req.user = user;

    // go to next chain
    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

export const jwtAuthAdmin = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    // get the payload data out of the token
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);
    const { role } = jwt.verify(token, process.env.TOKEN_SALT);

    const userRepository = DataSource.getRepository('User');
    
    const user = await userRepository.findOne({
      where: { id },
      relations: ['meta', 'role']
    });
    user.password = '';

    req.user = user;
    if(user.role.lable != 'admin'){
      return res.status(403).json({ message: 'You do not have permission!' });
    } else{
      next();
    }
    // go to next chain
  } catch (e) {
    console.log(e)
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

export const jwtAuthEditor = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    // get the payload data out of the token
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);
    const { role } = jwt.verify(token, process.env.TOKEN_SALT);

    const userRepository = DataSource.getRepository('User');
    
    const user = await userRepository.findOne({
      where: { id },
      relations: ['meta', 'role']
    });
    console.log(user.role.lable)
    

    // remove the password from the user object
    user.password = '';

    req.user = user;
    if(user.role.lable != "admin" && user.role.lable != "editor"){
      return res.status(403).json({ message: 'You do not have permission!' });
    }else {
      next();
    }
    // go to next chain
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
