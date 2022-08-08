const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TranscriptSchema = new Schema({
    
    email: {
        type: Schema.Types.String, ref: 'User',
    },
    message: {
        type: String
    },
    messageId: {
        type: String
    }
}, {
    timestamps: true
})

const Transcript = mongoose.model("Transcript", TranscriptSchema)

module.exports.Transcript = Transcript