import { Router } from "express";
import { setLogin } from "../controllers/login.controller.js";
import { setRegister } from "../controllers/register.controller.js";
import {
  createRecyclingPoint,
  getAllRecyclingCenters,
  getAllRecyclingPoints,
} from "../controllers/recyclingPoint.controller.js";
import { updateProfile } from "../controllers/profile.controller.js";
import { getUserDetails } from "../controllers/user.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the resigcla-v1 API!");
});
router.post("/login", setLogin);
router.post("/register", setRegister);
router.post("/create-recypoint", createRecyclingPoint);
router.get("/recypoints", getAllRecyclingPoints);
router.get("/recycenters", getAllRecyclingCenters);
router.post("/update-profile", updateProfile);
router.get("/user/:userId", getUserDetails);

export default router;
