import json
from datetime import datetime
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    group_name = 'channels_group'

    async def connect(self):
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        payload = {
            'type': 'send_message',
            'username': self.scope['user'].username,
            'message': json.loads(text_data)['message'],
            'datetime': datetime.now().isoformat(),
        }

        await self.channel_layer.group_send(self.group_name, payload)

    async def send_message(self, event):
        event.pop('type', None)

        await self.send(text_data=json.dumps(event))
