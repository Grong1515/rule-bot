import "reflect-metadata";
import express = require('express');
import { initBot } from "./bot";    
import { initOrm } from "./orm";

const expressApp: express.Application = express();

Promise.resolve().then(async () => {
    await initOrm();
    await initBot(expressApp);

    expressApp.get('/', (req, res) => {
        res.send('Hello World!')
    });

    expressApp.listen(process.env.PORT || 3000, () => {
        console.log(`App listening on port ${process.env.PORT || 3000}!`)
    });

    console.log("Bot started");

}).catch(error => console.log(error));
