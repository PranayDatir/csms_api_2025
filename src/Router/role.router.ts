import express from 'express';
import roleController from '../Controllers/roleController';
import auth from '../middleware/auth';

const router = express.Router();


router.post("/", auth.checkAuthWeb, roleController.create);
router.get("/", auth.checkAuthWeb, roleController.readAll);
router.get("/:id", auth.checkAuthWeb, roleController.readOne);
router.patch("/", auth.checkAuthWeb, roleController.updateMany);
router.patch("/:id", auth.checkAuthWeb, roleController.updateOne);
router.delete("/:id", auth.checkAuthWeb, roleController.deleteOne);

export default router;