import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { SlackService } from 'src/providers/slack/slack.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly slackService: SlackService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    console.error('예외 발생:', exception);

    this.slackService.postErrorToSlack(exception, request);
  }
}
