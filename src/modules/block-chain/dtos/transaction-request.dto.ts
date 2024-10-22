import {
  AccessListish,
  AddressLike,
  BigNumberish,
  BlobLike,
  BlockTag,
  KzgLibrary,
  TransactionRequest,
} from 'ethers';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionRequestDto implements TransactionRequest {
  @ApiProperty({
    description: '트랜잭션 유형',
    nullable: true,
  })
  type?: null | number;

  @ApiProperty({
    description: '수신자 주소',
    nullable: true,
  })
  to?: null | AddressLike;

  @ApiProperty({
    description: '발신자 주소',
    nullable: true,
  })
  from?: null | AddressLike;

  @ApiProperty({
    description: '트랜잭션 nonce',
    nullable: true,
  })
  nonce?: null | number;

  @ApiProperty({
    description: '트랜잭션의 가스 한도',
    nullable: true,
  })
  gasLimit?: null | BigNumberish;

  @ApiProperty({
    description: '트랜잭션의 가스 가격',
    nullable: true,
  })
  gasPrice?: null | BigNumberish;

  @ApiProperty({
    description: '최대 우선 순위 가스 요금',
    nullable: true,
  })
  maxPriorityFeePerGas?: null | BigNumberish;

  @ApiProperty({
    description: '최대 가스 요금',
    nullable: true,
  })
  maxFeePerGas?: null | BigNumberish;

  @ApiProperty({
    description: '트랜잭션 데이터',
    nullable: true,
  })
  data?: null | string;

  @ApiProperty({
    description: '전송할 금액',
    nullable: true,
  })
  value?: null | BigNumberish;

  @ApiProperty({
    description: '체인 ID',
    nullable: true,
  })
  chainId?: null | BigNumberish;

  @ApiProperty({
    description: '액세스 리스트',
    nullable: true,
  })
  accessList?: null | AccessListish;

  @ApiProperty({
    description: '사용자 정의 데이터',
    nullable: true,
  })
  customData?: any;

  @ApiProperty({
    description: '블록 태그',
    nullable: true,
  })
  blockTag?: BlockTag;

  @ApiProperty({
    description: 'CCIP 읽기 활성화 여부',
    nullable: true,
  })
  enableCcipRead?: boolean;

  @ApiProperty({
    description: '블롭 버전 해시 목록',
    nullable: true,
  })
  blobVersionedHashes?: null | Array<string>;

  @ApiProperty({
    description: '최대 블롭 가스 요금',
    nullable: true,
  })
  maxFeePerBlobGas?: null | BigNumberish;

  @ApiProperty({
    description: '블롭 데이터',
    nullable: true,
  })
  blobs?: null | Array<BlobLike>;

  @ApiProperty({
    description: 'KZG 라이브러리',
    nullable: true,
  })
  kzg?: null | KzgLibrary;
}
