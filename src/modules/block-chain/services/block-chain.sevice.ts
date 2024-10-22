import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ethers, TransactionReceipt, Wallet } from 'ethers';
import * as dotenv from 'dotenv';
import { TransactionRequestDto } from '../dtos/transaction-request.dto';
import { BlockWithTransactionReceiptDto } from '../dtos/block-with-transaction-receipt.dto';
import { EthersService } from '../../../providers/ethers/ethers.service';

dotenv.config();

@Injectable()
export class BlockChainService {
  constructor(private readonly ethersService: EthersService) {}

  /**
   * 블록체인 데이터를 데이터베이스에 저장합니다.
   * @param transactionRequestDto
   */
  async save(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionReceipt> {
    try {
      const receipt = this.ethersService.save(transactionRequestDto);

      if (receipt != null) {
        return receipt;
      } else {
        throw new InternalServerErrorException('receipt is null');
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
      const block = await this.ethersService.findBlock(blockHash);
      //Block의 TransactionReceipts 조회
      const transactionReceipts =
        await this.ethersService.findTransactionReceiptByBlock(block);

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
        await this.ethersService.findTransactionReceipt(transactionHash);
      return transactionReceipt;
    } catch (error) {
      console.error(error);
    }
  }
}
