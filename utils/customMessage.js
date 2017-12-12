class Message{
}

class ErrorMessage extends Message{
  constructor(code, err) {
    super();
    this.err = err;
    this.code = code;
    this.type = "Error";
  }
}


class SuccessMessage extends Message{
  constructor(code, data) {
    super();
    this.data = data;
    this.code = code;
    this.type = "Success";
  }
}

ErrorMessage.DATABASE_ERROR = "DATABASE_ERROR";
ErrorMessage.CREATING_OBJECT_ERROR = "CREATING_OBJECT_ERROR";
ErrorMessage.DELETING_OBJECT_ERROR = "DELETING_OBJECT_ERROR";
ErrorMessage.UPDATING_OBJECT_ERROR = "UPDATING_OBJECT_ERROR";
ErrorMessage.VALIDATING_OBJECT_ERROR = "VALIDATING_OBJECT_ERROR";
ErrorMessage.OBJECT_NOT_FOUND = "OBJECT_NOT_FOUND";


SuccessMessage.CREATING_OBJECT_SUCCESS = "CREATING_OBJECT_SUCCESS";
SuccessMessage.DELETING_OBJECT_SUCCESS = "DELETING_OBJECT_SUCCESS";
SuccessMessage.UPDATING_OBJECT_SUCCESS = "UPDATING_OBJECT_SUCCESS";
SuccessMessage.GETTING_DATA = "GETTING_DATA";

module.exports.SuccessMessage = SuccessMessage;
module.exports.ErrorMessage = ErrorMessage;
