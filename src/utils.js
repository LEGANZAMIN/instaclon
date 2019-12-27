import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);

    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
    var options = {
        auth: {
            api_user: process.env.SENDGRID_USER,
            api_key: process.env.SENDGRID_KEY
        }
    };

    var mailer = nodemailer.createTransport(sgTransport(options));
    return mailer.sendMail(email);
};

export const sendSecretMail = (email, secretKey) => {
    const objMail = {
        from: "lsmin01@gmail.com",
        to: email,
        subject: "Login Secret for Instaclon",
        html: `Hello! Your login key is <strong>${secretKey}</strong>.<br/> Copy and Paste on the app/website to log in`
    };

    return sendMail(objMail);
};

export const generateToken = id => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    return token;
};
