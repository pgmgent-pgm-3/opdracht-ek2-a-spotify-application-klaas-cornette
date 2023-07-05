/* eslint-disable consistent-return */
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { PUBLIC_PATH } from '../constants.js';
import DataSource from '../lib/DataSource.js';
/**
 * the upload middleware
 * a user can upload a file via the browser
 * this middleware will save the file to the server
 */

export const saveAvatar = async (req, res, next) => {
  const { file } = req;
  console.log(file);

  // if there is not a file sent, skip this middleware
  if (!file) return next();

  // kijken of de file een afbeelidng is
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/svg' ||
    file.mimetype === 'image/gif'
  ) {
    // de file test.png -> haalt ".png" eruit
    const extension = file.originalname.split('.').pop();

    // maak een unieke bestandsnaam met behulp van de uuid-bibliotheek
    const uniqueFileName = `${uuid()}.${extension}`;

    // bestand is een afbeelding dan gaat sharp de afbeelding verkleinen en opslaan
    await sharp(file.buffer)
      .resize(128, 128, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
      })
      .toFile(`${PUBLIC_PATH}/assets/imgAvatar/${uniqueFileName}`);

    const filePath = `/assets/imgAvatar/${uniqueFileName}`;
    // save new avatar url to databse
    // /assets/imgAvatar/${uniqueFileName}
    const currentUser = req.user;
    const { id } = currentUser.meta;
    const metaRepo = await DataSource.getRepository('UserMeta');
    const user = await metaRepo.findOne({
      where: { id },
    });
    await metaRepo.save({
      ...currentUser.meta,
      avatar: filePath,
    });

    console.log('user is:', user);
  } else {
    console.log('file type not supported'); // console
    res.send('file type not supported'); // browser
  }
  next();
};
