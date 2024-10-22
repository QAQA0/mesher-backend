import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionReceipt } from 'ethers';
import { BlockWithTransactionReceiptDto } from 'src/ethers/dto/block-with-transaction-receipt.dto';
import { EthersService } from '../ethers/ethers.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionRequestDto } from 'src/ethers/dto/transaction-request.dto';

@ApiTags('block-chain')
@Controller('block-chain')
export class BlockChainController {
  constructor(private readonly ethersService: EthersService) {}

  @Post('save')
  @ApiBody({ type: TransactionRequestDto })
  @ApiResponse({
    status: 201,
    description: '블록체인 데이터가 저장되었습니다.',
  })
  @ApiResponse({ status: 400, description: '요청 형식이 알맞지 않습니다.' })
  @ApiResponse({ status: 405, description: '메서드 형식이 알맞지 않습니다.' })
  save(
    @Body() transactionRequest: TransactionRequestDto,
  ): Promise<TransactionReceipt> {
    return this.ethersService.save(transactionRequest);
  }

  @Get('block')
  @ApiResponse({ status: 200, description: '블록 데이터 조회 성공' })
  @ApiResponse({ status: 400, description: 'Hash 형식이 알맞지 않습니다.' })
  @ApiResponse({ status: 405, description: '메서드 형식이 알맞지 않습니다.' })
  getBlock(
    @Query('blockHash') blockHash: string,
  ): Promise<BlockWithTransactionReceiptDto> {
    return this.ethersService.findBlock(blockHash);
  }

  @Get('transaction')
  @ApiResponse({ status: 200, description: '트랜잭션 영수증 조회 성공' })
  @ApiResponse({ status: 400, description: 'Hash 형식이 알맞지 않습니다.' })
  @ApiResponse({ status: 405, description: '메서드 형식이 알맞지 않습니다.' })
  getTransactionReceipt(
    @Query('transactionHash') transactionHash: string,
  ): Promise<TransactionReceipt> {
    return this.ethersService.findTransactionReceipt(transactionHash);
  }
}
