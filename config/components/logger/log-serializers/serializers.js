module.exports = {
  requestMax : function(req){
    return {
      method: req.method,
      url: req.url,
      body : req.body
    };
  },
  requestMin : function(req){
    return {
      method: req.method,
      url: req.url
    };
  },
  fnction : function(fnction){
    return "In function " + fnction.name;
  }
};

/**
pino.info({fnction : __filename+ ">" + name, "Add Object" : "here"}, "Your message here");
pino.info({requestMin : req, "Add Object" : "here"}, "Your message here");
pino.info({requestMax : req, "Add Object" : "here"}, "Your message here");

pino.error({fnction : __filename+ ">" + name, err : err}, "Your message here");
pino.error({requestMin : req, err : err, "Add Object" : "here"}, "Your message here");
pino.error({fnction : __filename+ ">" + name, err : err, "Add Object" : "here"}, "Your message here");

pino.debug({fnction : __filename+ ">" + name, "Add Object" : "here"}, "Your message here");
pino.debug({requestMin : req, "Add Object" : "here"}, "Your message here");
pino.debug({requestMax : req, "Add Object" : "here"}, "Your message here");
*/
