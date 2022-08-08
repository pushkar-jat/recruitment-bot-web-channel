const {
    ComponentDialog,
    WaterfallDialog,
    DialogSet,
    DialogTurnStatus,
    Dialog
} = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder') 
const { welcomeCard,welcomeCardFirst,firstCard, 
    secondCard,
    lastCard,
    countryCard,
    stateCard,
    cityCard,
    experienceCard} = require('../../resources') 
const { Constant } = require('../../helper');
const constant = require('../../helper/constant');
const {getCountryList,getStateList,getCityList} = require('../../api/api')
const {getTranscript, postTranscript} = require('../../controllers/transactionController')
const cacheProvider = require('../../services/cacheProvider')
const logger = require('winston')

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class RootDialog extends ComponentDialog {

    constructor(conversationState, userState, adapter) {
        super("RootDialog");
        this.userData = {
            email:"",
            userId:"",
            username:"",
            _id:null
        }
        this.conversationDataAccessor = conversationState;
        this.userState=userState;
        this.adapter = adapter;
         
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.initStep.bind(this),
                this.finalStep.bind(this)
            ]));
        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);
        return  await dialogContext.beginDialog(this.id);
         
    }

    async initStep(stepContext) {
        try { 
            const userText = stepContext.context.activity.text ? stepContext.context.activity.text.toLowerCase() : stepContext.context.activity.value.text;
            if(this.userData._id == null){
            this.userData.email = stepContext.context.activity.from.id+"@gmail.com"  
            this.userData.email = stepContext.context.activity.from.id+"@gmail.com"
            this.userData.userId = stepContext.context.activity.from.id
            this.userData.username = stepContext.context.activity.from.name 
            this.userData._id = stepContext.context.activity.dbId
            }
            const dialogData = this.userData;
            const dataFlow = await this.conversationDataAccessor.get(stepContext.context) 
            await menuRedirection(stepContext,dialogData,this.userData) 
            return Dialog.EndOfTurn
        } catch (error) {
            logger.error(`Bot flow failed due to Error : ${error?.message}`)
            await stepContext.context.sendActivity(Constant.SORRY_I_AM_STILL_LEARNING)
            await stepContext.cancelAllDialogs()
            return await stepContext.endDialog()
        }
    }

    async finalStep(stepContext) {  
        const dialogData =stepContext.options||{};
        const dataFlow = await this.conversationDataAccessor.get(stepContext.context) 
        await menuRedirection(stepContext,dialogData)
        return Dialog.EndOfTurn   
    } 
}

const menuRedirection = async(stepContext, dialogOptions,userData) => {  

    let text = String(stepContext?.context?.activity?.text || stepContext?.context?.activity?.value?.text).toLowerCase().trim().replace(Constant.REGX, '')
    let postTranscriptData = {   
        userId : dialogOptions.userId,
        message : "",
        messageId : "" 
    }
    switch(text) {
        case 'hi':
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : text,
                messageId : 'hi'
            } 
            await postTranscript(postTranscriptData)
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(welcomeCardFirst(stepContext?.context?.activity?.from?.name))] })
        case '#2': 
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : "No, I am not available",
                messageId : '#1'
            }  
            await postTranscript(postTranscriptData)
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(firstCard())] })
        case '#3':
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : "Yes, I am available",
                messageId : '#1'
            }  
            await postTranscript(postTranscriptData)
            const countryList = await getCountryList()
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(countryCard(countryList))] })
        case 'country': 
            let countryName = stepContext?.context?.activity?.value?.myCountry
            const stateList = await getStateList(countryName)   
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : countryName,
                messageId : 'country'
            }  
            await postTranscript(postTranscriptData)
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(stateCard(stateList))] })
        case 'state': 
            let stateName = stepContext?.context?.activity?.value?.myState
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : stateName,
                messageId : 'state'
            }
            await postTranscript(postTranscriptData)
            const cityList = await getCityList(stateName)  
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cityCard(cityList))] })
        case 'city':
            let cityName = stepContext?.context?.activity?.value?.myCity
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : cityName,
                messageId : 'city'
            }
            await postTranscript(postTranscriptData)
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(experienceCard())] })
        case 'experience': 
            let experience = stepContext?.context?.activity?.value?.value  
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : experience,
                messageId : 'experience'
            }
            await postTranscript(postTranscriptData) 
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(lastCard())] })
        case '#7':
            let value = stepContext?.context?.activity?.value?.value
            postTranscriptData.message = value
            postTranscriptData.messageId = '#7'  
            postTranscriptData = {   
                email: dialogOptions.email,
                userId : dialogOptions.userId,
                message : value,
                messageId : '#7'
            }
            await postTranscript(postTranscriptData) 
            return await stepContext.context.sendActivity({ attachments: [CardFactory.adaptiveCard(lastCard())] })
        default:
            return await stepContext.context.sendActivity(Constant.SORRY_I_AM_STILL_LEARNING)
    }

}

module.exports={
    RootDialog :RootDialog,
};