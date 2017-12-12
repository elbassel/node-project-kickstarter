const ErrorMessage = require('./customMessage').ErrorMessage;
const SuccessMessage = require('./customMessage').SuccessMessage;

module.exports = {
  sendResponse : function(req, res, message){
    switch (message.code) {
      case SuccessMessage.CREATING_OBJECT_SUCCESS:
        res.status(201).send(message);
        break;
      case SuccessMessage.GETTING_DATA:
        res.status(200).send(message);
        break;
      case SuccessMessage.DELETING_OBJECT_SUCCESS:
        res.status(200).send(message);
        break;
      case SuccessMessage.UPDATING_OBJECT_SUCCESS:
        res.status(200).send(message);
        break;
      case SuccessMessage.EMAIL_SENT:
        res.status(200).send(message);
        break;
      case SuccessMessage.RESET_PASSWORD:
        res.status(200).send(message);
        break;
      case ErrorMessage.CREATING_OBJECT_ERROR:
        res.status(500).send(message);
        break;
      case ErrorMessage.OBJECT_NOT_FOUND:
        res.status(404).send(message);
        break;
      // case ErrorMessage.DATABASE_ERROR:
      //   res.status(401).send(message);
      //   break;
      // case ErrorMessage.VALIDATION_ERROR:
      //   res.status(401).send(message);
      //   break;
      // case ErrorMessage.MISSING_PARAMETER:
      //   res.status(400).send(message);
      //   break;
      // case ErrorMessage.ALREADY_ENROLLED:
      //   res.status(400).send(message);
      //   break;
      // case ErrorMessage.UNAUTHORIZATION_ERROR:
      //   res.status(401).send(message);
      //   break;
      // case ErrorMessage.ALREADY_CREATED:
      //   res.status(401).send(message);
      //   break;
      // case ErrorMessage.AUTHENTICATION_ERROR:
      //   res.status(401).send(message);
      //   break;
      // case ErrorMessage.ALREADY_CREATED:
      //   res.status(401).send(message);
      //   break;
      // case ErrorMessage.UNSUPPORTED_OPERATION:
      //   res.status(401).send(message);
      //   break;

      default:
        res.status(200).send(message);
    }
  }
}
