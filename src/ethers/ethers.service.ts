import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers, TransactionReceipt, TransactionRequest, Wallet } from 'ethers';
import * as dotenv from 'dotenv';
import { BlockWithTransactionReceiptDto } from './block-with-transaction-receipt.dto';

dotenv.config();

@Injectable()
export class EthersService {
  private network: string = process.env.ETHEREUM_NETWORK;
  private infuraApiKey: string = process.env.INFURA_API_KEY;
  private provider = new ethers.InfuraProvider();
  private wallet = Wallet.createRandom(this.provider);

  constructor() {
    this.provider = new ethers.InfuraProvider(this.network, this.infuraApiKey);
  }

  /**
   * 블록체인 데이터를 데이터베이스에 저장합니다.
   * @param transactionRequest
   */
  async save(
    transactionRequest: TransactionRequest,
  ): Promise<TransactionReceipt> {
    try {
      const response = await this.wallet.sendTransaction(transactionRequest);
      const receipt = await response.wait();

      if (receipt != null) {
        return receipt;
      } else {
        throw BadRequestException;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * BlockHash 값을 기준으로 Block과 내부의 TransactionReceipt, Log를 조회합니다.
   * @param blockHash
   * @returns Promise<BlockWithTransactionReceiptDto>
   */
  async findBlock(blockHash: string): Promise<BlockWithTransactionReceiptDto> {
    try {
      console.log(blockHash);

      //Block 조회
      const block = await this.provider.getBlock(blockHash);
      //Block의 TransactionReceipts 조회
      const transactionReceipts = await Promise.all(
        block.transactions.map(async (transactionHash) => {
          const transactionReceipt =
            await this.provider.getTransactionReceipt(transactionHash);
          return transactionReceipt;
        }),
      );

      return new BlockWithTransactionReceiptDto(block, transactionReceipts);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * TransactionHash 값을 기준으로 TransactionReceipt, Log를 조회합니다.
   * @param transactionHash
   * @returns Promise<TransactionReceipt>
   */
  async findTransactionReceipt(
    transactionHash: string,
  ): Promise<TransactionReceipt> {
    try {
      console.log(transactionHash);

      //TransactionReceipts 조회
      const transactionReceipt =
        await this.provider.getTransactionReceipt(transactionHash);
      return transactionReceipt;
    } catch (error) {
      console.error(error);
    }
  }
}
