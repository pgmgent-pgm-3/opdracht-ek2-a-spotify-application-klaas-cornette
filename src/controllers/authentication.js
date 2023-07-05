/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/**
 * An authentication Controller
 */

import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

export const register = async (req, res) => {
  // errors
  const val = validationResult(req);
  const helperError = (errors) =>
    val.errors.find((error) => error.path === errors)?.msg ?? null;
  const { formErrors } = req;
  // input fields
  const inputs = [
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: helperError('email'),
      sort: 'input',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      password: req.body?.password ? req.body.password : '',
      error: helperError('password'),
      sort: 'input',
    },
    {
      name: 'firstname',
      label: 'Firstname',
      type: 'text',
      value: req.body?.firstname ? req.body.firstname : '',
      error: helperError('firstname'),
      sort: 'input',
    },
    {
      name: 'lastname',
      label: 'Lastname',
      type: 'text',
      value: req.body?.lastname ? req.body.lastname : '',
      error: helperError('lastname'),
      sort: 'input',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      value: req.body?.username ? req.body.username : '',
      error: helperError('username'),
      sort: 'input',
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'reader', label: 'reader' },
        { value: 'editor', label: 'editor' },
        { value: 'admin', label: 'admin' },
      ],
      value: req.body?.role || '',
      error: helperError('role'),
      sort: 'select',
    },
  ];

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const login = async (req, res) => {
  // errors
  const { formErrors } = req;
  const val = validationResult(req);
  const helperError = (errors) =>
    val.errors.find((error) => error.path === errors)?.msg ?? null;
  // input fields
  const inputs = [
    {
      name: 'email',
      label: 'E-mailadres',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: helperError('email'),
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      password: req.body?.password ? req.body.password : '',
      error: helperError('password'),
    },
  ];

  // render the login page
  res.render('login', {
    layout: 'authentication',
    // toevoegen van data aan de view
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    }
    // make user repository instance
    const userRepo = await DataSource.getRepository('User');
    const roleRepo = await DataSource.getRepository('Role');
    const role = await roleRepo.findOne({
      where: {
        lable: req.body.role,
      },
    });
    const userExists = await userRepo.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      req.formErrors = [{ message: 'Gebruiker bestaat al.' }];
      return next();
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    let user;
    user = await userRepo.create({
      email: req.body.email,
      password: hashedPassword,
      meta: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
      },
      role: {
        id: role.id,
      },
    });
    console.log(user);
    // save the user
    await userRepo.save(user);
    res.redirect('/login');
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      console.log('er is iets mis');
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    }
    // get the user
    const userRepo = await DataSource.getRepository('User');

    // change email to lowercase letters
    const lwEmail = req.body.email.toLowerCase();
    let user;
    // get a user with a specific email adress
    // we moeten nog knop maken voor of het leerkracht is of student

    user = await userRepo.findOne({
      where: {
        email: lwEmail,
      },
      relations: ['role', 'meta'],
    });
    // authentication validation
    if (!user) {
      req.formErrors = [{ message: 'Gebruiker bestaat niet.' }];
      return next();
    }
    const role = user.role.lable;
    // compare hashed password with saved hashed password
    const givenPassword = req.body.password; // supersecret
    const dbPassword = user.password; // $2b$10$9sWBzAraG2EQHZs62uyVdeH2dJxDAM4aWwlcNKWHAX.m2ZUjneEQa
    const isAMatch = bcrypt.compareSync(givenPassword, dbPassword); // true or false

    // password check
    if (!isAMatch) {
      req.formErrors = [{ message: 'Wachtwoord is niet correct.' }];
      return next();
    }
    // create the JWT web token, aka our identity card
    const token = jwt.sign(
      { id: user.id, email: req.body.email, role },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
    );

    // create a cookie and add this to the response
    res.cookie('token', token, { httpOnly: true });

    // redirect to our root
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
