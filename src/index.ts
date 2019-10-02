import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
const config = require('../ormconfig');

const expressApp: express.Application = express();

createConnection(config).then(async connection => {
    const bot = require('./bot');

    if (!process.env.HOOK_URL) bot.launch();
    else {
        expressApp.use(bot.webhookCallback('/' + process.env.SECRET_PATH));
        bot.telegram.setWebhook(process.env.HOOK_URL + process.env.SECRET_PATH);
        console.log('set webhook: ', process.env.HOOK_URL + process.env.SECRET_PATH);
    }

    expressApp.get('/', (req, res) => {
        res.send('Hello World!')
    });

    expressApp.listen(process.env.PORT || 3000, () => {
        console.log(`App listening on port ${process.env.PORT || 3000}!`)
    });

    console.log("Bot started");

}).catch(error => console.log(error));
