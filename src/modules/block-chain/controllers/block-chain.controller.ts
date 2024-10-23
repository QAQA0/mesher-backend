import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlockWithTransactionReceiptAndLogDto } from '../dtos/block-with-transaction-receipt-and-log.dto';
import { BlockChainService } from '../services/block-chain.sevice';
import { TransactionReceiptWithLogDto } from '../dtos/transaction-receipt-with-log.dto';

@ApiTags('block-chain')
@Controller('block-chain')
export class BlockChainController {
  constructor(private readonly blockChainService: BlockChainService) {}

  @Get('block')
  @ApiResponse({ status: 200, description: '블록 데이터 조회 성공' })
  @ApiResponse({ status: 400, description: 'Hash 형식이 알맞지 않습니다.' })
  @ApiResponse({ status: 405, description: '메서드 형식이 알맞지 않습니다.' })
  getBlock(
    @Query('blockHash') blockHash: string,
  ): Promise<BlockWithTransactionReceiptAndLogDto> {
    return this.blockChainService.findBlock(blockHash);
  }

  @Get('transaction')
  @ApiResponse({ status: 200, description: '트랜잭션 영수증 조회 성공' })
  @ApiResponse({ status: 400, description: 'Hash 형식이 알맞지 않습니다.' })
  @ApiResponse({ status: 405, description: '메서드 형식이 알맞지 않습니다.' })
  getTransactionReceipt(
    @Query('transactionHash') transactionHash: string,
  ): Promise<TransactionReceiptWithLogDto> {
    return this.blockChainService.findTransactionReceipt(transactionHash);
  }
}
