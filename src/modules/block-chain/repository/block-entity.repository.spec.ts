import { Test, TestingModule } from '@nestjs/testing';
import { BlockEntityRepository } from './block-entity.repository';
import { EthersModule } from '../../../providers/ethers/ethers.module';
import { BlockEntity } from '../entities/block.entity';
import { EthersService } from '../../../providers/ethers/ethers.service';
import { TransactionReceiptEntityRepository } from './transaction-receipt-entity.repository';
import { LogEntityRepository } from './log-entity.repository';
import { TransactionReceiptEntity } from '../entities/transactionReceipt.entity';
import { AppModule } from '../../../app.module';

describe('BlockEntityRepository', () => {
  let blockRepository: BlockEntityRepository;
  let transactionReceiptRepository: TransactionReceiptEntityRepository;
  let logRepository: LogEntityRepository;
  let ethersService: EthersService;
  const blockHash =
    '0x47d1a9521830fadb272f8e5e572b4774755f254651b042acd3f069dfc7137871';
  const transactionHash =
    '0xd30763c0e657a7542c9764ee97c1e8c2dd61d5d67808409928d0cd82245614b9';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EthersModule, AppModule],
      providers: [BlockEntityRepository],
    }).compile();

    blockRepository = module.get<BlockEntityRepository>(BlockEntityRepository);
    transactionReceiptRepository =
      module.get<TransactionReceiptEntityRepository>(
        TransactionReceiptEntityRepository,
      );
    logRepository = module.get<LogEntityRepository>(LogEntityRepository);
    ethersService = module.get<EthersService>(EthersService);
  });

  it('saveBlock', async () => {
    const block = await ethersService.getBlock();

    const blockEntity = BlockEntity.builder()
      .setHash(block.hash)
      .setParentHash(block.parentHash)
      .setNumber(block.number)
      .setTimestamp(block.timestamp)
      .setNonce(block.nonce)
      .setDifficulty(block.difficulty)
      .setGasLimit(block.gasLimit)
      .setGasUsed(block.gasUsed)
      .setMiner(block.miner)
      .setBaseFeePerGas(block.baseFeePerGas)
      .setTransactions(block.transactions as string[])
      .build();

    blockRepository.save(blockEntity);
  });

  it('getBlock', async () => {
    expect(blockRepository.findBlockByHash(blockHash)).toBeDefined();
  });

  it('saveTransactionReceipt', async () => {
    const block = await ethersService.getBlock();
    block.transactions.map(async (txHash) => {
      const receipt = await ethersService.getTransactionReceipt(txHash);

      const transactionEntity = TransactionReceiptEntity.builder()
        .setBlockHash(receipt.blockHash)
        .setBlockNumber(receipt.blockNumber)
        .setCumulativeGasUsed(receipt.cumulativeGasUsed)
        .setGasPrice(receipt.gasPrice)
        .setFrom(receipt.from)
        .setGasUsed(receipt.gasUsed)
        .setStatus(receipt.status)
        .setTo(receipt.to)
        .setTransactionHash(receipt.hash)
        .setTransactionIndex(receipt.index)
        .build();

      transactionReceiptRepository.save(transactionEntity);
    });
  });

  it('getTransactionReceipt', async () => {
    expect(
      transactionReceiptRepository.findAllByBlockHash(blockHash),
    ).toBeDefined();
  });

  it('getLog', async () => {
    expect(
      logRepository.findAllByTransactionHash(transactionHash),
    ).toBeDefined();
  });
});
