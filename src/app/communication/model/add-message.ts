export class AddMessageByChatRoomIdResource {
  chatRoomId: number;
  message: string;
  sender: number;

  constructor(chatRoomId: number, message: string, sender: number) {
    this.chatRoomId = chatRoomId;
    this.message = message;
    this.sender = sender;
  }
}
