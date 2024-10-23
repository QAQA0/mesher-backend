export const SlackConfig = {
  errorChannel: '#error',
  logChannel: '#log',
  serverChannel: '#server-status',
  token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
  botName: 'MesherBot',
  icon: ':computer:',
  url: 'https://slack.com/api/chat.postMessage',
};
