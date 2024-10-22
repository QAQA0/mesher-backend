import { Test, TestingModule } from '@nestjs/testing';
import { BlockChainService } from './block-chain.sevice';
import { EthersModule } from '../../../providers/ethers/ethers.module';

describe('BlockChainService', () => {
  let service: BlockChainService;
  const blockHash =
    '0xc7c9625aa709521bdc2d920e3ec00f45c3e2f5c6c4b1ad7a7f41c4d5b4a8a77c';
  const transactionHash =
    '0x6eb771a03ad23fed33ddf8c3076929f30afc78ebe9bc32fdbc0817f91138a604';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EthersModule],
      providers: [BlockChainService],
    }).compile();

    service = module.get<BlockChainService>(BlockChainService);
  });

  it('block', async () => {
    const block = (await service.findBlock(blockHash)).block;
    expect(block).toHaveProperty('number');
    expect(block).toHaveProperty('hash');
    expect(block).toHaveProperty('miner');
    expect(block).toHaveProperty('gasUsed');
    expect(block).toHaveProperty('gasLimit');
  });

  it('transactionReceipt', async () => {
    const transaction = await service.findTransactionReceipt(transactionHash);
    expect(transaction).toBeTruthy();
    expect(transaction).toHaveProperty('blockHash');
    expect(transaction).toHaveProperty('from');
    expect(transaction).toHaveProperty('gasPrice');
    expect(transaction).toHaveProperty('logs');
    expect(transaction).toHaveProperty('hash');
  });
});
