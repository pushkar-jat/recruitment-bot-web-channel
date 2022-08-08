module.exports.welcomeCard=function(id){
    return  {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.5",
        "body": [
            {
                "type": "TextBlock",
                "text": `Hi ${id}, Good to meet you.`,
                "wrap": true,
                "weight": "Bolder",
                "size": "Large"
            },
            {
                "type": "TextBlock",
                "text": "I am Career Bot",
                "wrap": true
            } 
        ]
    }
}

module.exports.welcomeCardFirst=function(id){
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
                                            "text":"#3"
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
                                            "text":"#2"
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