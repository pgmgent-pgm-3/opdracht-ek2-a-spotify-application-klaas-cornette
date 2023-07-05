import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

export const updateUser = async (req, res) => {
  // errors
  const val = validationResult(req);
  const helperError = (errors) =>
    val.errors.find((error) => error.path === errors)?.msg ?? null;
  const { formErrors } = req;
  // input fields
  const inputs = [
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
      value: req.user.meta.firstname,
      error: helperError('firstname'),
      sort: 'input',
    },
    {
      name: 'lastname',
      label: 'Lastname',
      type: 'text',
      value: req.user.meta.lastname,
      error: helperError('lastname'),
      sort: 'input',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      value: req.user.meta.username,
      error: helperError('username'),
      sort: 'input',
    },
  ];
  const { user } = req;
  // render the register page
  res.render('updateUser', {
    layout: 'authentication',
    inputs,
    formErrors,
    user,
  });
};

export const postUpdateUser = async (req, res, next) => {
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
    const currentUser = req.user;
    let hashedPassword;
    let user;
    if (req.body.password.length > 2) {
      hashedPassword = bcrypt.hashSync(req.body.password, 10);
      user = {
        ...currentUser,
        password: hashedPassword,
        meta: {
          id: currentUser.meta.id,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
        },
        role: {
          ...currentUser.role,
        },
      };
    }
    // save the user
    await userRepo.save(user);
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};
