# mesher-backend
매셔 백엔드 과제전형 리포지토리입니다.

## 서버 실행 방법
1. 서버 실행 전 main.ts의 ethersService.getDatas 메서드에 초기 Block 데이터를 몇 개 가져올 지 입력해주세요. </br>
2. $ docker-compose up 명령어 입력 </br>
3. localhost:3000 포트로 접속 </br>

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
- 최신 블록 데이터를 가져옵니다.

### 데이터 조회

#### Block 조회

// block-chain.service.ts  </br>
async findBlock(blockHash: string): Promise<BlockWithTransactionReceiptAndLogDto>
- 블록 Hash를 기준으로 데이터베이스에 저장되어있는 블록, 트랜잭션 영수증, 로그 데이터를 가져옵니다.

#### TransactionReceipt 조회

// block-chain.service.ts  </br>
async findTransactionReceipt(transactionHash: string): Promise<TransactionReceiptEntity>
- 트랜잭션 영수증 Hash를 기준으로 데이터베이스에 저장되어있는 트랜잭션 영수증, 로그 데이터를 가져옵니다.

### Slack 봇

- 1시간마다 서버 상태를 출력합니다.
- 5분마다 데이터의 개수를 출력합니다.
- 예외 발생 시 로그를 출력합니다.
