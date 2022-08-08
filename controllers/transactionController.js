const { Transcript } = require("../Models/Transcript");
const logger = require("winston");

module.exports.getTranscript = async (email) => {
  try {
    let transcript = await Transcript.find({ email: email });
    return transcript;
  } catch (err) {
    logger.error(`get transcript failed due to error:${err}`);
  }
};

module.exports.postTranscript = async (body) => {
  try {
    let transcript = await Transcript.create(body);
    return transcript;
  } catch (err) {
    logger.error(`post transcript api failed due to error:${err}`);
  }
};
