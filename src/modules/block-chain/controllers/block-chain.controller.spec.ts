import { Test, TestingModule } from '@nestjs/testing';
import { EthersModule } from '../../../providers/ethers/ethers.module';
import { BlockChainController } from './block-chain.controller';
import { BlockChainModule } from '../block-chain.module';

describe('BlockChainController', () => {
  let controller: BlockChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EthersModule, BlockChainModule],
      controllers: [BlockChainController],
    }).compile();

    controller = module.get<BlockChainController>(BlockChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
