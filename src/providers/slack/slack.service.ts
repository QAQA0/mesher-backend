import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { firstValueFrom } from 'rxjs';
import { SlackConfig } from 'src/modules/block-chain/config/slack/slack.config';

dotenv.config();

@Injectable()
export class SlackService {
  constructor(private httpService: HttpService) {}

  /**
   * 데이터 개수를 출력합니다.
   */
  async postLogToSlack(message: string) {
    let response = await firstValueFrom(
      this.httpService.post(
        SlackConfig.url,
        {
          username: SlackConfig.botName,
          icon_emoji: SlackConfig.icon,
          channel: SlackConfig.logChannel,
          text: message,
        },
        {
          headers: {
            Authorization: 'Bearer ' + SlackConfig.token,
          },
        },
      ),
    );
    if (!response.data.ok) {
      throw new HttpException(
        `Failed to send Slack message, details: ${response.data.error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data.message;
  }

  /**
   * 한 시간마다 서버 상태를 출력합니다.
   */
  @Cron('0 * * * *')
  async postServerStatusToSlack() {
    const currentTime = Date.now();
    const uptime = currentTime - global.serverStartTime;

    const seconds = Math.floor((uptime / 1000) % 60);
    const minutes = Math.floor((uptime / (1000 * 60)) % 60);
    const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

    const message = `
*서버 상태 알림*

> 서버 정상 실행 중 :white_check_mark:
> 
> \`${days}\`일 \`${hours}\`시간 \`${minutes}\`분 \`${seconds}\`초 동안 실행 중
    `;
    let response = await firstValueFrom(
      this.httpService.post(
        SlackConfig.url,
        {
          username: SlackConfig.botName,
          icon_emoji: SlackConfig.icon,
          channel: SlackConfig.serverChannel,
          text: message,
        },
        {
          headers: {
            Authorization: 'Bearer ' + SlackConfig.token,
          },
        },
      ),
    );
    if (!response.data.ok) {
      throw new HttpException(
        `Failed to send Slack message, details: ${response.data.error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data.message;
  }

  /**
   * 에러를 감지하여 출력합니다.
   */
  async postErrorToSlack(exception: unknown, request: Request) {
    const message = `
*서버 에러 발생*
> Request URL: ${request.url}
> Method : ${request.method}
> Status : ${exception instanceof HttpException ? exception.getStatus() : 500}
\`\`\`
${exception instanceof HttpException ? exception.stack : exception}
\`\`\`
`;

    let response = await firstValueFrom(
      this.httpService.post(
        SlackConfig.url,
        {
          username: SlackConfig.botName,
          icon_emoji: SlackConfig.icon,
          channel: SlackConfig.errorChannel,
          text: message,
        },
        {
          headers: {
            Authorization: 'Bearer ' + SlackConfig.token,
          },
        },
      ),
    );
    if (!response.data.ok) {
      throw new HttpException(
        `Failed to send Slack message, details: ${response.data.error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data.message;
  }
}
