const router = require("express").Router();


const memoController = require("../controllers/memo");
const tokenHandller = require("../handlers/tokenHandller");

router.post("/",tokenHandller.verifyToken,memoController.create)

router.get("/",tokenHandller.verifyToken,memoController.getAll)
router.get("/:memoid",tokenHandller.verifyToken,memoController.getOne)


module.exports = router;
