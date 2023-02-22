export interface userData {
    name: string;
    email: string;
    passwrod: string;
    userName: string;
    phoneNumber: number;
    accountNumber: number;
    verified: boolean;
    wallet: {}[];
    history: {}[];
}


export interface walletData {
    balance: number;
    credit: number;
    debit: number;
}

export interface historyData {
    message: string;
    transactionRef: number;
    transactionType: String;
}