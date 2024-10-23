# mesher-backend
매셔 백엔드 과제전형 리포지토리입니다.

## 서버 실행 방법
$ docker-compose up
localhost:3000 포트로 접속

테스트 작성 완료
Docker-compose 설정 완료

## 사용 스택
Nest.js(Node version 20.11.1) </br>
Ethers.js </br>
Typescript </br>
Docker  </br>
Swagger API </br>

## API Docs
Swagger API를 사용하여 API 문서를 개발하였습니다.
URL: http://localhost:3000/api

## 기능

### 데이터 저장

// main.ts  </br>
ethersService.getDatas(number);
- number 입력 시 number만큼의 데이터를 가져와 Database에 저장합니다.

// ethers.service.ts  </br>
async getLatestData()
- 스케줄러를 이용하여 최신 블록 데이터를 가져옵니다. (12초 간격)

### 데이터 조회

#### Block 조회

// block-chain.service.ts  </br>
async findBlock(blockHash: string): Promise<BlockWithTransactionReceiptAndLogDto>
- 블록 Hash를 기준으로 데이터베이스에 저장되어있는 블록, 트랜잭션 영수증, 로그 데이터를 가져옵니다.

#### TransactionReceipt 조회

// block-chain.service.ts  </br>
async findTransactionReceipt(transactionHash: string): Promise<TransactionReceiptEntity>
- 트랜잭션 영수증 Hash를 기준으로 데이터베이스에 저장되어있는 트랜잭션 영수증, 로그 데이터를 가져옵니다.

## Notion
https://political-tsunami-40f.notion.site/Mesher-Backend-12611fde6e0380b1b401c63cd5a7b876?pvs=4  </br>

- 개발 회고, 업무 진행 사항이 적혀 있습니다.
