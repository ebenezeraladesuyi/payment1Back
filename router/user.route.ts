import Router from "express";
import { registerUser, makeTransfer } from "../controller/user.controller";


const router = Router();

router.route("/register").post(registerUser)
router.route("/sendmoney/:userId/:walletId").post(makeTransfer)


export default router;