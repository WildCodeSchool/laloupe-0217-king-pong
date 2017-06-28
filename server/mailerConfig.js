import nodemailer from 'nodemailer';
import {config} from './mail.js';

module.exports = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.email,
      pass: config.pass
    }
  });
};
