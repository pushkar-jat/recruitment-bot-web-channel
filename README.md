# Microsoft Bot Framework for Web channel

# Description

This sample demonstrates how to integrate Web Chat in a way that 1) does not expose your Direct Line secret to the browser, and 2) mitigates user impersonation by not allowing the client to set its own user ID.

See the [Motivation](#Motivation) section below for more background on these issues.
Backend and frontend for web channel using Microsoft Bot Framework. Developed in Nodejs, with three major functionalities: Authentication with bot service  token, recruitment bot flow and transcript storage.      
Project Include azure bot service app, Central Logging system using winston.
</br>

<!-- TABLE OF CONTENTS -->
### Table of Contents
* [Assignment](#assignments)
* [Installation](#installation) 
* [Central Log system](#logs) 
</br>
</br> 


## Assignments: <i id="assignments"></i>

[✅] Develop the below workflow in Microsoft Bot Framework for web channel  
[✅] Chatbot transcript should be stored in MongoDB
[✅]  If any user come again than previous chat history should be visible to the end user.        
[X] If any user does not respond to chatbot for 1 Minute than proactive message should be prompt to user  - Not working    
[✅] Third party API needs to integrate for retrieve country, state and city list in the workflow below - Provide open API in PDF file are not working, so i pickup open API for country, state and city from universal-tutorial  
[✅] Centralized log monitoring system for complete application using winston
[✅] Deployed complete application using azure devops bot app service


</br>

## Deployed URL
```
Frontend - https://recrutment-bot.azurewebsites.net/index.html
Backend - https://recrutment-bot.azurewebsites.net/api/messages
```

## Installation: <i id="installation"></i> 
```
Unzip file
npm install
```
</br>

## Usage: <i id="usage"></i> 
<b>1. Variable in `.env` file or use given defaults</b>
```
MICROSOFT_APP_ID=7aeaf7fb-fc2a-4e53-83bf-b2ee7f1ff257
MICROSOFT_APP_PASSWORD=6yq8Q~rOcDbTEQtCX1Yd7qN1MclzoeEd8SHRWc7g 
MONGOOSE_STRING=mongodb+srv://user:user@cluster0.fqqttdq.mongodb.net/?retryWrites=true&w=majority
```

<b>2. Start server with:</b>
```
npm start or node index.js
```
<b>2. Start frontend with:</b>
```
public/index.html
```


</br>
 
## Central Log system: <i id="logs"></i>
This project doesn't use console.log anywhere, instead it uses [winston](https://www.npmjs.com/package/winston) to generate a central log file,       
If you have used the app or tests then log file can be found here:           
`combined.log` and  `error.log` in logs folder

</br>
 
 

# References:

# How to run locally

This demo includes a bot that you will run locally, so before running the code, you will have to set up an Azure Bot Service resource.

1. [Clone the code](#clone-the-code)
1. [Setup Azure Bot Services](#setup-azure-bot-services)
1. [Prepare and run the code](#prepare-and-run-the-code)

## Clone the code

To host this demo, you will need to clone the code and run locally.

<details><summary>Clone the JavaScript project</summary>

1. Clone this repository
1. Create two empty files for environment variables, `/bot/.env` and `/web/.env`

</details>

<details><summary>Clone the C# project</summary>

1. Clone this repository
1. Open the two `appsettings.json` files at `/bot/appsettings.json` and `/web/appsettings.json`

</details>

## Setup Azure Bot Services

> We prefer to use [Bot Channel Registration](https://ms.portal.azure.com/#create/Microsoft.BotServiceConnectivityGalleryPackage) during development. This will help you diagnose problems locally without deploying to the server and speed up development.

You can follow our instructions on how to [setup a new Bot Channel Registration](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-3.0). Then save the resulting IDs/secrets into the appropriate local environment files, depending on your language:

<details><summary>JavaScript</summary>

1. Save the Microsoft App ID and password to `/bot/.env`
   -  ```
      MICROSOFT_APP_ID=12345678abcd-1234-5678-abcd-12345678abcd
      MICROSOFT_APP_PASSWORD=<your-microsoft-app-password>
      ```
1. Save the Web Chat secret to `/web/.env`
   -  ```
      DIRECT_LINE_SECRET=<your-direct-line-secret>
      ```

</details>

<details><summary>C#</summary>

1. Save the Microsoft App ID and password to `/bot/appsettings.json`
   -  ```
      "MicrosoftAppId": "12345678abcd-1234-5678-abcd-12345678abcd"
      "MicrosoftAppPassword": "<your-microsoft-app-password>"
      ```
1. Save the Web Chat secret to `/web/appsettings.json`
   -  ```
      "DirectLineSecret": "<your-direct-line-secret>"
      ```

</details>

During development, you will run your bot locally. Azure Bot Services will send activities to your bot thru a public URL. You can use [ngrok](https://ngrok.com/) to expose your bot server on a public URL.

1. Run `ngrok http -host-header=localhost:3978 3978`
1. Update your Bot Channel Registration. You can use [Azure CLI](https://aka.ms/az-cli) or [Azure Portal](https://portal.azure.com)
   -  Via Azure CLI
      -  Run `az bot update --resource-group <your-bot-rg> --name <your-bot-name> --subscription <your-subscription-id> --endpoint "https://a1b2c3d4.ngrok.io/api/messages"`
   -  Via Azure Portal
      -  Browse to your Bot Channel Registration
      -  Select "Settings"
      -  In "Configuration" section, set "Messaging Endpoint" to `https://a1b2c3d4.ngrok.io/api/messages`

## Prepare and run the code

1. Under each of `bot`, and `web` folder, run the following commands, depending on your language:

   <details><summary>JavaScript</summary>

   1. `npm install`
   1. `npm start`

   </details>

   <details><summary>C#</summary>

   1. `dotnet build`
   1. `dotnet run`

   </details>

1. Browse to http://localhost:5000/ to start the demo

# Things to try out

-  Type anything to the bot. It should reply with your user ID, which will stay the same for the duration of the session.
-  Open a new browser tab to http://localhost:5000 and type anything to the bot. It should reply with a different user ID since it has generated a different Direct Line token.

# Code

The code is organized into two separate folders:

-  `/bot/` is the bot server
-  `/web/` is the REST API for generating Direct Line tokens
   -  `GET /api/directline/token` will generate a new Direct Line token for the app. The token will be bound to a random user ID.
   -  During development-time, it will also serve the bot server via `/api/messages/`
      -  To enable this feature, add `PROXY_BOT_URL=http://localhost:3978` to `/web/.env`

 

</details>

The user ID is prefixed with "dl\_" as required by the [Direct Line token API](https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0#generate-token).

## Retrieving a user-specific Direct Line token

The backend API calls the Direct Line API to retrieve a Direct Line token. Notice that we pass the user ID in the body of the request:

<details><summary>JavaScript</summary>

```js
// web/src/generateDirectLineToken.js

async function generateDirectLineToken(secret, userId) {
   const { token } = await fetchJSON('https://directline.botframework.com/v3/directline/tokens/generate', {
      headers: {
         authorization: `Bearer ${secret}`,
         'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
         user: {
            id: userId
         }
      })
   });

   return token;
}
```

</details>

<details><summary>C#</summary>
 
// public/index.html

const { token } = await fetchJSON('/api/directline/token');

WebChat.renderWebChat(
   {
      directLine: WebChat.createDirectLine({ token }),
      styleOptions: {
         backgroundColor: 'rgba(255, 255, 255, .8)'
      }
   },
   document.getElementById('webchat')
);
```

Note that we do _not_ specify a user ID when initiating Web Chat. Direct Line will handle sending the user ID to the bot based on the token.

# Overview

This sample includes multiple parts:

-  **The UI** is a static HTML/JS web page with Web Chat integrated via JavaScript bundle. It makes a POST request to the backend API and uses the resulting Direct Line token to render Web Chat.
-  **The backend API** generates Direct Line tokens. Each generated token is bound to a new, randomly-generated user ID.
-  **The bot** is a bare-bones bot that responds to every message by sending the user's ID.

## Motivation

### Hiding the Web Chat secret

When embedding Web Chat into a site, you must provide either your Direct Line secret or a Direct Line token so that Web Chat can communicate with the bot. The Direct Line secret can be used to access all of the bot's conversations, and it doesn't expire. A Direct Line token can only be used to access a single conversation, and it does expire. See the [Direct Line Authentication documentation](https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0) for more information.

Therefore, embedding Web Chat using the Direct Line secret directly is strongly discouraged because it would expose your secret on the client-side. Instead, the recommended approach is to exchange the secret for a Direct Line token on the server-side. This sample shows how to obtain and use the token.

### Avoiding user impersonation

Web Chat allows you to specify a user ID on the client-side, which will be sent in activities to the bot. However, this is susceptible to user impersonation because a malicious user could modify their user ID. Since the user ID typically isn't verified, this is a security risk if the bot stores sensitive data keyed on the user ID. For example, the built-in [user authentication support in Azure Bot Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-authentication?view=azure-bot-service-4.0) associates access tokens with user IDs.

To avoid impersonation, the recommended approach is for the server to bind a user ID to the Direct Line token. Then any conversation using that token will send the bound user ID to the bot. However, if the client is going to provide the user ID to the server, it is important for the server to validate the ID somehow (see below). Otherwise, a malicious user could still modify the user ID being sent by the client.

To keep things simple, this sample generates a random user ID on the server-side and binds it to the Direct Line token. While this mitigates impersonation concerns, the downside is that users will have a different ID every time they talk to the bot.

## Content of the local environment files

The `.env` / `appsettings.json` files hold the environment variable critical to run the service. These are usually security-sensitive information and must not be committed to version control. Although we recommend to keep them in [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/), for simplicity of this sample, we would keep them in local environment files.

To ease the setup of this sample, here is the template of the local environment files for each language.

<details><summary>JavaScript</summary>

### `/bot/.env`

```
MICROSOFT_APP_ID=12345678abcd-1234-5678-abcd-12345678abcd
MICROSOFT_APP_PASSWORD=<your-microsoft-app-password>
```
 
# Frequently asked questions

## What if I need a consistent user ID across sessions/devices?

Instead of randomly generating user IDs, the backend API could leverage a user's existing identity from a true identity provider. The user would first sign in to the site before talking to the bot. That way, if the user signed in using the same identity on a different browser or device, the user ID would be the same. This would also prevent user impersonation because we could verify the user's identity with the identity provider before issuing a Direct Line token.

The flow could be:

1. The user signs in to the web app.
1. The web app calls the backend API for generating Direct Line tokens, providing a verifiable user token.
1. The backend API verifies the user token with the identity provider.
1. The backend API uses the token to get an ID for the user. (The specifics will vary based on the identity provider and type of token.)
1. The backend API generates a Direct Line token bound to the user ID (just as this sample does) and returns it to the web app.

# Further reading

-  [Setting up a new Bot Channel Registration](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-3.0)
-  [Generating a Direct Line token](https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0#generate-token)
-  [Enhanced Direct Line Authentication feature](https://blog.botframework.com/2018/09/25/enhanced-direct-line-authentication-features/)
