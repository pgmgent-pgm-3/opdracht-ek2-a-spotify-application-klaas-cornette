/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import DataSource from '../../lib/DataSource.js';

dotenv.config();

export const makeUser = async (req, res, next) => {
  const userRepo = await DataSource.getRepository('User');

  const aantalUsersToGenerate = 50;
  for (let i = 0; i < aantalUsersToGenerate; i++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const username = faker.internet.userName();
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@gmail.com`;
    const userExists = await userRepo.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      req.formErrors = [{ message: 'Gebruiker bestaat al.' }];
      return next();
    }
    const hashedPassword = bcrypt.hashSync(faker.internet.password(), 10);
    const user = await userRepo.create({
      email,
      password: hashedPassword,
      meta: {
        firstname,
        lastname,
        username,
        avatar: faker.internet.avatar(),
      },
      role: {
        id: 1,
      },
    });
    await userRepo.save(user);
  }
};
