// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
  TeamsActivityHandler,
  MessageFactory,
  CardFactory,
} = require("botbuilder");
const {
  welcomeCard,
  welcomeCardFirst,
  firstCard,
  secondCard,
  lastCard,
  countryCard,
  stateCard,
  cityCard,
  experienceCard,
} = require("../resources/index");
const { getUser, postUser } = require("../controllers/userController");
const { getCountryList, getStateList, getCityList } = require("../api/api");

const {
  getTranscript,
  postTranscript,
} = require("../controllers/transactionController");
const cacheProvider = require("../services/cacheProvider");
const Constant = require("../helper/index");
const logger = require("winston");

class MainActivityHandler extends TeamsActivityHandler {
  constructor(conversationState, userState, dialog) {
    super();

    if (!conversationState)
      logger.error(
        "[DialogBot]: Missing parameter. conversationState is required"
      );
    if (!userState)
      logger.error("[DialogBot]: Missing parameter. userState is required");

    if (!dialog)
      logger.error("[DialogBot]: Missing parameter. dialog is required");
    this.dialog = dialog;
    this.userId = null;
    this.conversationState = conversationState;
    this.userState = userState;
    this.dialogState = this.conversationState.createProperty("DialogState");
    this.userDialogState = this.userState.createProperty("UserDialogState");

    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => { 
      
      await dialog.run(context, this.dialogState);
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
    // Handler for when members are added to the conversation
    this.onMembersAdded(async (context, next) => {
      const wasNonBotMemberAdded = context?.activity?.membersAdded.some(
        (channelAccount) =>
          channelAccount?.id !== context?.activity?.recipient?.id
      );

      if (wasNonBotMemberAdded) {
        let email = `${context?.activity?.from?.id}@gmail.com`;

        context.activity.from.email = email;
        let user = await getUser(email);
        let dropdown = {
          country:"",
          state:"",
          city:""
        }
        if (user) {
          let transcriptData = await getTranscript(
            context?.activity?.from?.email
          );
          // await menuRedirection(transcriptData,context)
          let data = transcriptData.map((value) => {
            return {
              message: value._doc.message,
              messageId: value._doc.messageId,
              timestamp: value._doc.timestamps,
            };
          });
          if (data?.length > 0) {
            for (let i in data) {
              let text = data[Number(i)].messageId.toLowerCase();
              switch (text) {
                case "hi":
                  await context.sendActivity({
                    attachments: [
                      CardFactory.adaptiveCard(
                        welcomeCard(context?.activity?.from?.id)
                      ),
                    ],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  break;
                case "#1":
                  await context.sendActivity({
                    attachments: [
                      CardFactory.adaptiveCard(
                        welcomeCardFirst(context?.activity?.from?.id)
                      ),
                    ],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  break;
                case "#2":
                  await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(firstCard())],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  break;
                case "country":
                  const countryList = await getCountryList();
                  await context.sendActivity({
                    attachments: [
                      CardFactory.adaptiveCard(countryCard(countryList)),
                    ],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  break;

                case "state":
                  const stateList = await getStateList(
                    data[Number(i) - 1].message
                  );
                  await context.sendActivity({
                    attachments: [
                      CardFactory.adaptiveCard(stateCard(stateList)),
                    ],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  break;

                case "city":
                  const cityList = await getCityList(
                    data[Number(i) - 1].message
                  );
                  await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(cityCard(cityList))],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  break;

                case "experience":
                  await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(experienceCard())],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(lastCard())],
                  });
                  break;

                case "#7":
                  await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(firstCard())],
                  });
                  await context.sendActivity(data[Number(i)].message);
                  await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(lastCard())],
                  });
                  break;

                default:
                  await context.sendActivity(
                    Constant.SORRY_I_AM_STILL_LEARNING
                  );
                  break;
              }
            }
          }
        } else {
          let userRes = await postUser({
            userId: context?.activity?.from?.id,
            email: email,
            username: context?.activity?.from?.name || "",
          });
          let userId = Buffer.from(userRes?._id, "utf8").toString();
          this.userId = userId;
        }
        await context.sendActivity({
          attachments: [
            CardFactory.adaptiveCard(welcomeCard(context.activity.from.id)),
          ],
        });
      }
      await next();
    });
  }

  async run(context) {
    await super.run(context);
    // Save any state changes. The load happened during the execution of the Dialog.
    await this.conversationState.saveChanges(context, false);
    await this.userState.saveChanges(context, false);
  }
}

module.exports.MainActivityHandler = MainActivityHandler;
