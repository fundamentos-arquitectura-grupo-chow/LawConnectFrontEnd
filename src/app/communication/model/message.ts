export class MessageResource {
  id: number;
  content: string;
  chatRoomId: number;
  isRead: boolean;
  senderType: string;

  constructor(id: number, content: string, chatRoomId: number, isRead: boolean, senderType: string) {
    this.id = id;
    this.content = content;
    this.chatRoomId = chatRoomId;
    this.isRead = isRead;
    this.senderType = senderType;
  }
}
