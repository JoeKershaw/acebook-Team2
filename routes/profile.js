var express = require('express');
var router = express.Router();

var ProfileController = require('../controllers/profile')

router.get('/', ProfileController.Index);
router.get('/edit', ProfileController.Editor)
router.post('/edit', ProfileController.EditUser)
router.post('/', ProfileController.Create);
router.post('/delete', ProfileController.Delete);


module.exports = router;
