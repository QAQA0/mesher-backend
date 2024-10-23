import { Test, TestingModule } from '@nestjs/testing';
import { EthersService } from './ethers.service';
import { AppModule } from '../../app.module';

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [EthersService],
    }).compile();

    service = module.get<EthersService>(EthersService);
  });

  it('defined', async () => {
    expect(service).toBeDefined();
  });
});
