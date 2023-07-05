import { body } from 'express-validator';

export default [
  body('email').isEmail().withMessage('Geef een geldig e-mailadres op'),
  body('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Het wachtwoord moet tussen de 6 en 20 karakters lang zijn'),
  body('firstname')
    .isLength({ min: 2, max: 20 })
    .withMessage('je naam moet tussen de 2 en 20 karakters lang zijn'),
  body('lastname')
    .isLength({ min: 2, max: 20 })
    .withMessage('je naam moet tussen de 2 en 20 karakters lang zijn'),
  body('username')
    .isLength({ min: 2, max: 20 })
    .withMessage('je username moet tussen de 2 en 20 karakters lang zijn'),
];
