import { Block, TransactionReceipt } from "ethers";

export class BlockWithTransactionReceiptDto {
    block: Block
    transactionReceipts: TransactionReceipt[]

    constructor(block: Block, transactionReceipts: TransactionReceipt[]) {
        this.block = block;
        this.transactionReceipts = transactionReceipts;
    }
}

