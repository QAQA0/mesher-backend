import { Test, TestingModule } from '@nestjs/testing';
import { BlockChainService } from './block-chain.sevice';
import { EthersModule } from '../../../providers/ethers/ethers.module';
import { AppModule } from '../../../app.module';
import { SlackModule } from '../../../providers/slack/slack.module';
import { BlockEntityRepository } from '../repository/block-entity.repository';
import { TransactionReceiptEntityRepository } from '../repository/transaction-receipt-entity.repository';
import { LogEntityRepository } from '../repository/log-entity.repository';

describe('BlockChainService', () => {
  let service: BlockChainService;
  const blockHash =
    '0x47d1a9521830fadb272f8e5e572b4774755f254651b042acd3f069dfc7137871';
  const transactionHash =
    '0xd30763c0e657a7542c9764ee97c1e8c2dd61d5d67808409928d0cd82245614b9';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EthersModule, AppModule, SlackModule],
      providers: [
        BlockChainService,
        BlockEntityRepository,
        TransactionReceiptEntityRepository,
        LogEntityRepository,
      ],
    }).compile();

    service = module.get<BlockChainService>(BlockChainService);
  });

  //Block 조회 기능 테스트
  it('block', async () => {
    const block = (await service.findBlock(blockHash)).block;
    expect(block).toHaveProperty('number');
    expect(block).toHaveProperty('hash');
    expect(block).toHaveProperty('miner');
    expect(block).toHaveProperty('gasUsed');
    expect(block).toHaveProperty('gasLimit');
  });

  //TransactionReceipt 조회 기능 테스트
  it('transactionReceipt', async () => {
    const transaction = (await service.findTransactionReceipt(transactionHash))
      .transactionReceipt;
    expect(transaction).toHaveProperty('blockHash');
    expect(transaction).toHaveProperty('from');
    expect(transaction).toHaveProperty('gasPrice');
    expect(transaction).toHaveProperty('transactionHash');
  });
});
