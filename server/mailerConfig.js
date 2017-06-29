import nodemailer from 'nodemailer';
import {config} from './mail.js';
require('dotenv').config({path:'../.env'});

module.exports = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_MAIL || config.email,
      pass: process.env.PASSWORD || config.pass
    }
  });
};
