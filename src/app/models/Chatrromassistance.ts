import { MessageChattrom } from './MessageChattrom';
import { user } from './User';

export class Chatrromassistance {
    chatRoomId!: number;
    description!: string;
    nom!: string;
    owner!: user;
    status!: boolean;
    messages!: MessageChattrom[];
    isitowner!:boolean;
    isitinthelis!:boolean;
    users!:user[];
  }