/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllUsers = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('User');
    const allUsers = await userRepo.find();
    res.status(201).json(allUsers);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRepo = DataSource.getRepository('User');
    const user = await userRepo.findBy({ id });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRepo = DataSource.getRepository('User');
    const userToDelete = await userRepo.findOneBy({ id });
    await userRepo.delete(userToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateMeta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRepo = DataSource.getRepository('User');
    const user = await userRepo.findOne({
      where: { id },
      relations: ['meta'],
    });

    const updateUser = {
      ...user,
      meta: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        avatar: req.body.avatar,
      },
    };
    const userMeta = await userRepo.save(updateUser);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: userMeta.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
