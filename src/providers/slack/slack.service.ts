import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SlackService {
    private readonly token: string = process.env.SLACK_BOT_USER_OAUTH_TOKEN;
    
}
