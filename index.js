// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const path = require('path');

const dotenv = require('dotenv');
// Import required bot configuration.
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const cacheProvider = require('./services/cacheProvider')

const restify = require('restify');

const {RootDialog} = require('./dialogs')

const winston = require('winston')
const {initializeLogger} = require('./services/logger')
const logger = initializeLogger()

logger.add(
    new winston.transports.Console({
        format: winston.format.simple()
    })
)

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
 

const connect = mongoose.connect("mongodb+srv://user:user@cluster0.fqqttdq.mongodb.net/?retryWrites=true&w=majority")
connect
.then((db) => {
    logger.info("Connected to db Successfully");
})
.catch((err) => {
    logger.error("Error ===> ", err);
})

cacheProvider.start(function(err){
    if(err) return logger.error(`Cache provider error : ${error}`)
})

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter } = require('botbuilder');
const { ConversationState,UserState, MemoryStorage } = require('botbuilder');

// This bot's main dialog.
const { MainActivityHandler } = require('./bot/bot');

// Create HTTP server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    logger.info(`\n${ server.name } listening to ${ server.url }`);
    logger.info('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    logger.info('\nTo talk to your bot, open the emulator select "Open Bot"');
});
 

// memory upto 2kb
const memoryStorage = new MemoryStorage();
const userState = new UserState(memoryStorage);
const conversationState = new ConversationState(memoryStorage);

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights. See https://aka.ms/bottelemetry for telemetry 
    //       configuration instructions.
    logger.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('Sorry, Still Learning');
    await context.sendActivity('To continue to run this bot, please restart the server.');
};
 

// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

const rootDialog= new RootDialog(conversationState, userState, adapter);

// Create the main dialog.
const recruitmentBot = new MainActivityHandler(conversationState, userState, rootDialog);

//TODO
// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        //call bot by run method
        await recruitmentBot.run(context);
    });
});

// Listen for Upgrade requests for Streaming.
server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    });
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;

    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        await recruitmentBot.run(context);
    });
}); 
server.get('/index.html', restify.plugins.serveStatic({
    directory: './public'
}))