module.exports.firstCard=function(){
    return  {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": "Thanks for answering. Should we contact you again?",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "After 1 month",
                                        "data": {
                                            "text": "#7",
                                            "value":"After 1 month"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "After 3 months",
                                        "data": {
                                            "text": "#7",
                                            "value":"After 3 months"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "No, I will contact you",
                                        "data": {
                                            "text": "#7",
                                            "value":"No, I will contact you"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

module.exports.secondCard=function(){
    return  {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [ 
            {
                "type": "TextBlock",
                "text": "First thing first, are you still available for job opportunity",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Yes, I am available",
                                        "data":{
                                            "text":"#4"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "No, I am not available",
                                        "data":{
                                            "text":"#7"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

module.exports.lastCard=function(){
    return  {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [ 
            {
                "type": "TextBlock",
                "text": "Thank you for your time. Our Talent Advisor will get in touch with you shortly.",
                "wrap": true,
                "weight": "Bolder" 
            },
            {
                "type": "TextBlock",
                "text": "Have a great day!Have a great day!",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            } 
        ]
    }
}

module.exports.countryCard=function(countryList){

    let countryListChoices = []
    for(let i in countryList){
        let choice = 
            {
              "title": countryList[i],
              "value": countryList[i]
            } 
        countryListChoices.push(choice)
    }

    return {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": "What is your current country of residence?",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            },
            {
                "type": "Input.ChoiceSet",
                "id": "myCountry",
                "style": "compact",
                "label": "select country ",
                "isMultiSelect": false,
                "value": countryList[0],
                "choices": countryListChoices
              }
        ],
        "actions": [{
            "type": "Action.Submit",
            "title": "submit",
            "data":{
                "text":"country",
                "value":"myCountry"
            }
        }]
    }
}

module.exports.stateCard=function(stateList){
    let stateListChoices = []
    for(let i in stateList){
        let choice = 
            {
              "title": stateList[i],
              "value": stateList[i]
            } 
        stateListChoices.push(choice)
    }

    return {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": "What is your current state of residence?",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            },
            {
                "type": "Input.ChoiceSet",
                "id": "myState",
                "style": "compact",
                "label": "select state ",
                "isMultiSelect": false,
                "value": stateList[0],
                "choices": stateListChoices
              }
        ],
        "actions": [{
            "type": "Action.Submit",
            "title": "submit",
            "data":{
                "text":"state",
                "value":"myState"
            }
        }]
    }
}

module.exports.cityCard=function(cityList){

    let cityListChoices = []
    for(let i in cityList){
        let choice = 
            {
              "title": cityList[i],
              "value": cityList[i]
            } 
        cityListChoices.push(choice)
    }

    return {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": "What is your current city of residence?",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            },
            {
                "type": "Input.ChoiceSet",
                "id": "myCity",
                "style": "compact",
                "label": "select city ",
                "isMultiSelect": false,
                "value": cityList[0],
                "choices": cityListChoices
              }
        ],
        "actions": [{
            "type": "Action.Submit",
            "title": "submit",
            "data":{
                "text":"city",
                "value":"myCity"
            }
        }]
    }
}

module.exports.experienceCard=function(){
    return {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": "What is your total years of experience?",
                "wrap": true,
                "weight": "Bolder",
                "spacing": "Large"
            },
            {
                "type": "ActionSet",
                "title": "0 to 2 years", 
                "actions": [
                {
                    "type": "Action.Submit",
                    "title": "0 to 2 years",
                    "data":{
                        "text":"experience",
                        "value": "0 to 2 years"
                    } 
                }
                ]
            },
            {
                "type": "ActionSet",
                "title": "2 to 4 years", 
                "actions": [
                {
                    "type": "Action.Submit",
                    "title": "2 to 4 years",
                    "data":{
                        "text":"experience",
                        "value": "2 to 4 years"   
                    }
                }
                ]
            },
            {
                "type": "ActionSet",
                "title": "4 to 6 years", 
                "actions": [
                {
                    "type": "Action.Submit",
                    "title": "4 to 6 years",
                    "data":{
                        "text":"experience",
                        "value": "4 to 6 years"                  
                    }
                }
                ]
            },
            {
                "type": "ActionSet",
                "title": "6 to 9 years", 
                "actions": [
                {
                    "type": "Action.Submit",
                    "title": "6 to 9 years",
                    "data":{
                        "text":"experience",
                        "value": "6 to 9 years"                 
                    }
                }
                ]
            },
            {
                "type": "ActionSet",
                "title": "9 to 12 years", 
                "actions": [
                {
                    "type": "Action.Submit",
                    "title": "9 to 12 years",
                    "data":{
                        "text":"experience",
                        "value": "9 to 12 years"         
                    }
                }
                ]
            },
            {
                "type": "ActionSet",
                "title": "13+ years", 
                "actions": [
                {
                    "type": "Action.Submit",
                    "title": "13+ years",
                    "data":{
                        "text":"experience",
                        "value": "13+ years"   
                    }
                }
                ]
            }
        ]
    }
}