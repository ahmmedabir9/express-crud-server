const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/User.model");
const { response } = require("../utils/response");

//create user
const createUser = async (req, res) => {
  const { name, email, username, phone, address, company, website } = req.body;

  try {
    if (!name || !email || !username) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        {},
        "Name Email & Username are required fields"
      );
    }

    const dupEmail = await User.findOne({ email: email });

    if (dupEmail) {
      return response(
        res,
        StatusCodes.NOT_ACCEPTABLE,
        false,
        { emailExist: true },
        "User with this email already created"
      );
    }

    const dupUsername = await User.findOne({ username: username });

    if (dupUsername) {
      return response(
        res,
        StatusCodes.NOT_ACCEPTABLE,
        false,
        { usernameExist: true },
        "User with this username already created"
      );
    }

    const user = await User.create({
      name,
      email,
      username,
      phone,
      address,
      company,
      website,
    });

    if (!user) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Chould not create user"
      );
    }

    return response(res, StatusCodes.ACCEPTED, true, user, null);
  } catch (error) {
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      error.message
    );
  }
};

// get all user
const getAllUser = async (req, res) => {
  const { searchKey, sortBy, limit, skip } = req.body;
  try {
    const userCounts = await User.countDocuments().where(
      searchKey
        ? {
            $or: [
              {
                email: { $regex: searchKey, $options: "i" },
              },
              {
                phone: { $regex: searchKey, $options: "i" },
              },
              {
                name: { $regex: searchKey, $options: "i" },
              },
              {
                company: { $regex: searchKey, $options: "i" },
              },
            ],
          }
        : null
    );

    const users = await User.find()
      .where(
        searchKey
          ? {
              $or: [
                {
                  email: { $regex: searchKey, $options: "i" },
                },
                {
                  phone: { $regex: searchKey, $options: "i" },
                },
                {
                  name: { $regex: searchKey, $options: "i" },
                },
                {
                  company: { $regex: searchKey, $options: "i" },
                },
              ],
            }
          : null
      )
      .sort(sortBy ? { [sortBy.field]: [sortBy.order] } : { createdAt: -1 })
      .limit(limit ? limit : null)
      .skip(skip ? skip : null)
      .exec();

    return response(res, StatusCodes.OK, true, { users, userCounts }, null);
  } catch (error) {
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      error.message
    );
  }
};

module.exports = { createUser, getAllUser };
