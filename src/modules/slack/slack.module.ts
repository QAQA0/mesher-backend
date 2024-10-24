import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SlackService } from "./slack.service";

@Module({
    imports: [HttpModule],
    providers: [SlackService],
    exports: [SlackService]
})
export class SlackModule{}