const express = require('express');
const router = express.Router();
const userApp = require('./users_app');
const renderResponseUtil = require('../utils/RenderResponseUtil');
const auth = require('../config').components.auth;
router.post('/', (req, res)=>{

  const userObj = req.body;
  userApp.createUser(userObj)
    .then(userMsg => renderResponseUtil.sendResponse(req, res, userMsg))
    .catch(errMsg => renderResponseUtil.sendResponse(req, res, errMsg) );

});

router.get('/:id', auth, (req, res)=>{

  const userId = req.params.id;
  userApp.getUserById(userId)
    .then(userMsg => renderResponseUtil.sendResponse(req, res, userMsg))
    .catch(errMsg => renderResponseUtil.sendResponse(req, res, errMsg) );

});



module.exports = router;
