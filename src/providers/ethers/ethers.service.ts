import { BadRequestException, Injectable } from '@nestjs/common';
import { Block, ethers, TransactionReceipt, Wallet } from 'ethers';
import * as dotenv from 'dotenv';
import { TransactionRequestDto } from '../../modules/block-chain/dtos/transaction-request.dto';

dotenv.config();

@Injectable()
export class EthersService {
  private readonly network: string = process.env.ETHEREUM_NETWORK;
  private readonly infuraApiKey: string = process.env.INFURA_API_KEY;
  private provider = new ethers.InfuraProvider();
  private wallet = Wallet.createRandom(this.provider);

  constructor() {
    this.provider = new ethers.InfuraProvider(this.network, this.infuraApiKey);
  }

  /**
   * 블록체인 데이터 저장
   */
  async save(transactionRequestDto: TransactionRequestDto) {
    const response = await this.wallet.sendTransaction(transactionRequestDto);
    return await response.wait();
  }

  /**
   * 블록 조회
   * @param blockHash
   */
  async findBlock(blockHash: string) {
    return await this.provider.getBlock(blockHash);
  }

  /**
   * 블록을 기준으로 트랜잭션 영수증 조회
   * @param block
   */
  async findTransactionReceiptByBlock(block: Block) {
    const transactionReceipts = await Promise.all(
      block.transactions.map(async (transactionHash) => {
        const transactionReceipt =
          await this.provider.getTransactionReceipt(transactionHash);
        return transactionReceipt;
      }),
    );

    return transactionReceipts;
  }

  /**
   * 트랜잭션 영수증 조회
   * @param transactionHash
   */
  async findTransactionReceipt(transactionHash: string) {
    return await this.provider.getTransactionReceipt(transactionHash);
  }
}
