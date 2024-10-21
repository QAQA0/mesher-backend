import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionReceipt, TransactionRequest } from 'ethers';
import { BlockWithTransactionReceiptDto } from 'src/ethers/block-with-transaction-receipt.dto';
import { EthersService } from '../ethers/ethers.service';

@Controller('block-chain')
export class BlockChainController {
  constructor(private readonly ethersService: EthersService) {}

  @Post('save')
  save(
    @Body() transactionRequest: TransactionRequest,
  ): Promise<TransactionReceipt> {
    return this.ethersService.save(transactionRequest);
  }

  @Get('block')
  getBlock(
    @Query('blockHash') blockHash: string,
  ): Promise<BlockWithTransactionReceiptDto> {
    return this.ethersService.findBlock(blockHash);
  }

  @Get('transaction')
  getTransactionReceipt(
    @Query('transactionHash') transactionHash: string,
  ): Promise<TransactionReceipt> {
    return this.ethersService.findTransactionReceipt(transactionHash);
  }
}
