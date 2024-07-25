import { user } from './User';
import { Reaction } from './Reaction';
import { Reponse } from './Reponse';
export class MessageChattrom {
    messageId!: number;
    dateTime!: Date;
    content!: string;
    user!: user;
    isityourcomment!:boolean;
    reponse!:Reponse;
    reactions!:Reaction[];
    isHovered:boolean=false;
    likenbr:number=0;
    lovenbr:number=0;
    angrynbr:number=0;
    hahanbr:number=0;
  }