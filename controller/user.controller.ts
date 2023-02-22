import userModel from "../model/user.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import walletModel from "../model/wallet.model";
import historyModel from "../model/history.model";


// create user with a wallet
export const registerUser = async(req: Request, res: Response) => {
    try {
        
        const { name, email, password, userName, phoneNumber } = req.body

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const dater = Date.now();

        const genNumber = Math.floor(Math.random()* 78) + dater  

        let num = 234

        const regUser = await userModel.create({
            name,
            email,
            userName,
            password: hash,
            phoneNumber: num - phoneNumber,
            verified: true,
            accountNumber : genNumber,
        });

        const createWallet = await walletModel.create({
            _id : regUser?._id,
            balance: 1000,
            credit: 0,
            debit: 0,
        })

        regUser?.wallet.push(new mongoose.Types.ObjectId(createWallet?._id));

        regUser.save();

        return res.status(200).json({
            message: "successfully created",
            data: regUser,
            token: jwt.sign({_id: regUser._id}, "gt45-gh56-467r-syhg")
        })

     } catch (error) {
        return res.status(404).json({
            message: "an error occured",
            error: error
        })
    }
}


// transfer to another wallet
export const makeTransfer = async(req: Request, res: Response) => {
    try{

        const { accountNumber, amount } = req.body;

        const refGenNumber = Math.floor(Math.random() * 67456745) + 243;

        // receiver account
        const getReceiver = await userModel.findOne( {accountNumber} );
        const getReceiverWallet = await walletModel.findById(getReceiver?._id);

        // sender account
        const getUser = await userModel.findById(req.params.userId);
        const getUserWallet = await walletModel.findById(req.params.walletId);

        if (getUser && getReceiver) {
            if (amount > getUserWallet?.balance!) {
                return res.status(404).json({
                    message: "insufficients fund",
                });
            } else {
                // updating the sender wallet
                await walletModel.findByIdAndUpdate(getUserWallet?._id, {
                    balance: getUserWallet?.balance! - amount,
                    credit: 0,
                    debit: amount,
                });

                const createHistorySender = await historyModel.create({
                    message: `you have sent ${amount} to ${getReceiver?.name}`,
                    transactionType: "debit",
                    transactionRef: refGenNumber,
                })

                getUser?.history?.push(
                    new mongoose.Types.ObjectId(createHistorySender?._id),
                );

                getUser?.save();

                // receiver wallet
                await walletModel.findByIdAndUpdate(getReceiverWallet?._id, {
                    balance: getReceiverWallet?.balance! + amount,
                    credit: amount,
                    debit: 0,
                });

                const createHistoryReceiver = await historyModel.create({
                    message: `an amount of ${amount} has been sent to you by ${getUser?.name}`,
                    transactionType: "credit",
                    transactionRef: refGenNumber,
                });

                getReceiver?.history?.push(new mongoose.Types.ObjectId(createHistoryReceiver?._id),);
                getReceiver?.save();
                
            } 
            return res.status(200).json({
                message: "transaction successful",
            })
        } else {
            return res.status(404).json({
                message: "account not found",
            })
        }

    } catch (error) {
        return res.status(404).json({
            message : "an error occured",
            error
        })
    }
}
