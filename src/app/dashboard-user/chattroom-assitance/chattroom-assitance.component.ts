import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chatrromassistance } from '../../models/Chatrromassistance';
import { user } from '../../models/User';
import { ToastNoAnimationModule, ToastrModule, ToastrService } from 'ngx-toastr';
import { ChatroomAssistanceService } from '../../services/chatroom-assistance.service';
import { ReactionresponseService } from '../../services/reactionresponse.service';
import { Reaction } from '../../models/Reaction';
import { Reponse } from '../../models/Reponse';
import { MessageChattrom } from '../../models/MessageChattrom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
@Component({
  selector: 'app-chattroom-assitance',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,DatePipe,CommonModule ,MatDialogModule, 
    ToastrModule,
    ToastNoAnimationModule
  ], 
  templateUrl: './chattroom-assitance.component.html',
  styleUrl: './chattroom-assitance.component.css'
})
export class ChattroomAssitanceComponent {
@ViewChild('root')
root!: ElementRef;
Chatrooms!:Chatrromassistance[];
selctedchattroom!:Chatrromassistance;
addchatroomforum!: FormGroup;
editchatroomforum!: FormGroup;
idddmmmessage!:number;
idrooommm!:number;
rectionpopup:boolean=false;
openaddforum:boolean=false;
Users!:user[];
currentuser= new user();
isPublicadd: boolean = true;
isPublicedit!:boolean;
openivt:boolean=false;
openj:boolean=false;
idroom!:number;
openedit:boolean=false;
messageadd!:string;
messagedit!:string;
idmessage!:number;
selectedUserIds: number[] = [];
isHovered: boolean = false;
showUpdateInput: boolean = false;
showResponseInput: boolean = false;
messagResponse!:string;
appelle:boolean=false;
zp!:any;
roomidappele!:string;
filteredChatrooms: Chatrromassistance[] = [];
username!:string;
searchText: string = '';
constructor(private toastr: ToastrService,private ChatroomMessageService: ChatroomAssistanceService, private ReactionReponseService: ReactionresponseService,private dialogRef : MatDialog , private formBuilder: FormBuilder) { }
ngOnInit(): void {
  this.initializeaddForm();
  this.initializeeditForm();
  this.currentuser.id=1;
  this.ChatroomMessageService.getAllRooms().subscribe((data) => {
    if (data ) {
      console.log(data)
        // @ts-ignore
      this.Chatrooms = data;
     
      for (let i = 0; i < this.Chatrooms.length; i++) {
        this.Chatrooms[i].isitowner = this.Chatrooms[i].owner.id === this.currentuser.id;
        this.Chatrooms[i].isitinthelis = this.Chatrooms[i].users.some(user => user.id === this.currentuser.id);

       
          if (this.Chatrooms[i].messages && this.Chatrooms[i].messages.length > 0) {
            for (let j = 0; j < this.Chatrooms[i].messages.length; j++) {
              this.Chatrooms[i].messages[j].isityourcomment = this.Chatrooms[i].messages[j].user.id === this.currentuser.id;
              
            }
          }
        
      }
      for (let i = 0; i < this.Chatrooms.length; i++) {
        for(let j=0;j<this.Chatrooms[i].messages.length;j++){
          this.Chatrooms[i].messages[j].likenbr=0;
          this.Chatrooms[i].messages[j].hahanbr=0;
          this.Chatrooms[i].messages[j].lovenbr=0;
          this.Chatrooms[i].messages[j].angrynbr=0;
          for(let k=0;k<this.Chatrooms[i].messages[j].reactions.length;k++){
            if(this.Chatrooms[i].messages[j].reactions[k].type=="Like"){
              this.Chatrooms[i].messages[j].likenbr=+1;
            }
            if(this.Chatrooms[i].messages[j].reactions[k].type=="HAHA"){
              this.Chatrooms[i].messages[j].hahanbr=+1;
            }
            if(this.Chatrooms[i].messages[j].reactions[k].type=="LOVE"){
              this.Chatrooms[i].messages[j].lovenbr=+1;
            }
            if(this.Chatrooms[i].messages[j].reactions[k].type=="ANGRY"){
              this.Chatrooms[i].messages[j].angrynbr= +1;
            }
          }
        }
      }
      
    }
    this.filteredChatrooms = this.Chatrooms;
    this.ChatroomMessageService.getAllUsers().subscribe((ii) => {
      // @ts-ignore
      this.Users = ii;
      for(let k=0;k<this.Users.length;k++){
        if(this.Users[k].id==this.currentuser.id){this.username=this.Users[k].username}
      
    }
      this.Users = this.Users.filter(user => user.id !== this.currentuser.id);
      
    });
  });
}

onlike(){
  let foundReaction = false;
  
  for (let i = 0; i < this.Chatrooms.length; i++) {
      if (this.Chatrooms[i].chatRoomId == this.idrooommm) {
          for (let j = 0; j < this.Chatrooms[i].messages.length; j++) {
              if (this.Chatrooms[i].messages[j].messageId == this.idddmmmessage) {
                  const reactions = this.Chatrooms[i].messages[j].reactions;
                  const userReaction = reactions.find(reaction => reaction.user.id == this.currentuser.id);
                  
                  if (userReaction) {
                      if (userReaction.type == "Like") {
                          foundReaction = true;
                          this.ReactionReponseService.deleteReaction(userReaction.reactionid).subscribe(
                              response => {  
                                  this.rectionpopup = false;
                                  this.Chatrooms[i].messages[j].likenbr--;
                                  this.Chatrooms[i].messages[j].reactions = reactions.filter(react => react.reactionid !== userReaction.reactionid);
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      } else {
                          this.ReactionReponseService.UpdateReaction(userReaction.reactionid, "Like").subscribe(
                              response => {
                                // @ts-ignore
                                  this.rectionpopup = false;
                                  
                                  for(let l=0;l<this.Chatrooms[i].messages[j].reactions.length;l++){
                                    if(this.Chatrooms[i].messages[j].reactions[l].reactionid==userReaction.reactionid){
                                     
                                      switch(this.Chatrooms[i].messages[j].reactions[l].type) {
                                        case "HAHA":
                                          this.Chatrooms[i].messages[j].hahanbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].likenbr++;
                                            break;
                                        case "LOVE":
                                          this.Chatrooms[i].messages[j].lovenbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].likenbr++;
                                            break;
                                        case "ANGRY":
                                          this.Chatrooms[i].messages[j].angrynbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].likenbr++;
                                            break;
                                        default:
                                            break;
                                    }
                                   break;
                                    }
                                    
                                  }
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      }
                  } else {
                      const newReaction = new Reaction();
                      newReaction.type = "Like";
                      
                      this.ReactionReponseService.AddReaction(newReaction, this.idddmmmessage, this.currentuser.id).subscribe(
                          response => {
                            // @ts-ignore
                              this.rectionpopup = false;
                              this.Chatrooms[i].messages[j].reactions.push(response);
                              this.Chatrooms[i].messages[j].likenbr++;
                             
                          },
                          error => {
                              console.log(error)
                          }
                      );
                  }
              }
              
              // If a reaction is found, exit the loop
              if (foundReaction) {
                  break;
              }
          }
      }
      
      // If a reaction is found, exit the loop
      if (foundReaction) {
          break;
      }
  }
}





onhaha(){
  let foundReaction = false;
  
  for (let i = 0; i < this.Chatrooms.length; i++) {
      if (this.Chatrooms[i].chatRoomId == this.idrooommm) {
          for (let j = 0; j < this.Chatrooms[i].messages.length; j++) {
              if (this.Chatrooms[i].messages[j].messageId == this.idddmmmessage) {
                  const reactions = this.Chatrooms[i].messages[j].reactions;
                  const userReaction = reactions.find(reaction => reaction.user.id == this.currentuser.id);
                  
                  if (userReaction) {
                      if (userReaction.type == "HAHA") {
                          foundReaction = true;
                          this.ReactionReponseService.deleteReaction(userReaction.reactionid).subscribe(
                              response => {  
                                  this.rectionpopup = false;
                                  this.Chatrooms[i].messages[j].hahanbr--;
                                  this.Chatrooms[i].messages[j].reactions = reactions.filter(react => react.reactionid !== userReaction.reactionid);
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      } else {
                          this.ReactionReponseService.UpdateReaction(userReaction.reactionid, "HAHA").subscribe(
                              response => {
                                // @ts-ignore
                                  this.rectionpopup = false;
                                  
                                  for(let l=0;l<this.Chatrooms[i].messages[j].reactions.length;l++){
                                    if(this.Chatrooms[i].messages[j].reactions[l].reactionid==userReaction.reactionid){
                                     
                                      switch(this.Chatrooms[i].messages[j].reactions[l].type) {
                                        case "Like":
                                          this.Chatrooms[i].messages[j].likenbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].hahanbr++;
                                            break;
                                        case "LOVE":
                                          this.Chatrooms[i].messages[j].lovenbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].hahanbr++;
                                            break;
                                        case "ANGRY":
                                          this.Chatrooms[i].messages[j].angrynbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].hahanbr++;
                                            break;
                                        default:
                                            break;
                                    }
                                   break;
                                    }
                                    
                                  }
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      }
                  } else {
                      const newReaction = new Reaction();
                      newReaction.type = "HAHA";
                      
                      this.ReactionReponseService.AddReaction(newReaction, this.idddmmmessage, this.currentuser.id).subscribe(
                          response => {
                            // @ts-ignore
                              this.rectionpopup = false;
                              this.Chatrooms[i].messages[j].reactions.push(response);
                              this.Chatrooms[i].messages[j].hahanbr++;
                          },
                          error => {
                              console.log(error)
                          }
                      );
                  }
              }
              
              // If a reaction is found, exit the loop
              if (foundReaction) {
                  break;
              }
          }
      }
      
      // If a reaction is found, exit the loop
      if (foundReaction) {
          break;
      }
  }
}
onlove(){
  let foundReaction = false;
  
  for (let i = 0; i < this.Chatrooms.length; i++) {
      if (this.Chatrooms[i].chatRoomId == this.idrooommm) {
          for (let j = 0; j < this.Chatrooms[i].messages.length; j++) {
              if (this.Chatrooms[i].messages[j].messageId == this.idddmmmessage) {
                  const reactions = this.Chatrooms[i].messages[j].reactions;
                  const userReaction = reactions.find(reaction => reaction.user.id == this.currentuser.id);
                  
                  if (userReaction) {
                      if (userReaction.type == "LOVE") {
                          foundReaction = true;
                          this.ReactionReponseService.deleteReaction(userReaction.reactionid).subscribe(
                              response => {  
                                  this.rectionpopup = false;
                                  this.Chatrooms[i].messages[j].lovenbr--;
                                  this.Chatrooms[i].messages[j].reactions = reactions.filter(react => react.reactionid !== userReaction.reactionid);
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      } else {
                          this.ReactionReponseService.UpdateReaction(userReaction.reactionid, "LOVE").subscribe(
                              response => {
                                // @ts-ignore
                                  this.rectionpopup = false;
                                  
                                  for(let l=0;l<this.Chatrooms[i].messages[j].reactions.length;l++){
                                    if(this.Chatrooms[i].messages[j].reactions[l].reactionid==userReaction.reactionid){
                                     
                                      switch(this.Chatrooms[i].messages[j].reactions[l].type) {
                                        case "Like":
                                          this.Chatrooms[i].messages[j].likenbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].lovenbr++;
                                            break;
                                        case "HAHA":
                                          this.Chatrooms[i].messages[j].hahanbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].lovenbr++;
                                            break;
                                        case "ANGRY":
                                          this.Chatrooms[i].messages[j].angrynbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].lovenbr++;
                                            break;
                                        default:
                                            break;
                                    }
                                   break;
                                    }
                                    
                                  }
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      }
                  } else {
                      const newReaction = new Reaction();
                      newReaction.type = "LOVE";
                      
                      this.ReactionReponseService.AddReaction(newReaction, this.idddmmmessage, this.currentuser.id).subscribe(
                          response => {
                            // @ts-ignore
                              this.rectionpopup = false;
                              this.Chatrooms[i].messages[j].reactions.push(response);
                              this.Chatrooms[i].messages[j].lovenbr++;
                          },
                          error => {
                              console.log(error)
                          }
                      );
                  }
              }
              
              // If a reaction is found, exit the loop
              if (foundReaction) {
                  break;
              }
          }
      }
      
      // If a reaction is found, exit the loop
      if (foundReaction) {
          break;
      }
  }
}
onangry(){
  let foundReaction = false;
  
  for (let i = 0; i < this.Chatrooms.length; i++) {
      if (this.Chatrooms[i].chatRoomId == this.idrooommm) {
          for (let j = 0; j < this.Chatrooms[i].messages.length; j++) {
              if (this.Chatrooms[i].messages[j].messageId == this.idddmmmessage) {
                  const reactions = this.Chatrooms[i].messages[j].reactions;
                  const userReaction = reactions.find(reaction => reaction.user.id == this.currentuser.id);
                  
                  if (userReaction) {
                      if (userReaction.type == "ANGRY") {
                          foundReaction = true;
                          this.ReactionReponseService.deleteReaction(userReaction.reactionid).subscribe(
                              response => {  
                                  this.rectionpopup = false;
                                  this.Chatrooms[i].messages[j].angrynbr--;
                                  this.Chatrooms[i].messages[j].reactions = reactions.filter(react => react.reactionid !== userReaction.reactionid);
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      } else {
                          this.ReactionReponseService.UpdateReaction(userReaction.reactionid, "ANGRY").subscribe(
                              response => {
                                // @ts-ignore
                                  this.rectionpopup = false;
                                  
                                  for(let l=0;l<this.Chatrooms[i].messages[j].reactions.length;l++){
                                    if(this.Chatrooms[i].messages[j].reactions[l].reactionid==userReaction.reactionid){
                                     
                                      switch(this.Chatrooms[i].messages[j].reactions[l].type) {
                                        case "Like":
                                          this.Chatrooms[i].messages[j].likenbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].angrynbr++;
                                            break;
                                        case "HAHA":
                                          this.Chatrooms[i].messages[j].hahanbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].angrynbr++;
                                            break;
                                        case "LOVE":
                                          this.Chatrooms[i].messages[j].lovenbr--;
                                          this.Chatrooms[i].messages[j].reactions[l]=response;
                                          this.Chatrooms[i].messages[j].angrynbr++;
                                            break;
                                        default:
                                            break;
                                    }
                                   break;
                                    }
                                    
                                  }
                              },
                              error => {
                                  console.log(error)
                              }
                          );
                      }
                  } else {
                      const newReaction = new Reaction();
                      newReaction.type = "ANGRY";
                      
                      this.ReactionReponseService.AddReaction(newReaction, this.idddmmmessage, this.currentuser.id).subscribe(
                          response => {
                            // @ts-ignore
                              this.rectionpopup = false;
                              this.Chatrooms[i].messages[j].reactions.push(response);
                              this.Chatrooms[i].messages[j].angrynbr++;
                          },
                          error => {
                              console.log(error)
                          }
                      );
                  }
              }
              
              // If a reaction is found, exit the loop
              if (foundReaction) {
                  break;
              }
          }
      }
      
      // If a reaction is found, exit the loop
      if (foundReaction) {
          break;
      }
  }
}
closepopupreaction(){
  this.rectionpopup=false;
}
opeenpopupreaction(){
  this.rectionpopup=true;
}
OnClickHover(id:number){
  for(let i=0;i<this.selctedchattroom.messages.length;i++){
    if(this.selctedchattroom.messages[i].messageId==id){
      this.selctedchattroom.messages[i].isHovered=true;
      if(this.selctedchattroom.messages[i].reponse!=null){
        this.messagResponse=this.selctedchattroom.messages[i].reponse.content;
      }
    }
  }
}
OnDblClickHover(id:number){
  for(let i=0;i<this.selctedchattroom.messages.length;i++){
    if(this.selctedchattroom.messages[i].messageId==id){
      this.selctedchattroom.messages[i].isHovered=false;
      this.messagResponse="";
    }
  }
}
AddReponse(id:number){
  let r=new Reponse();
  r.content=this.messagResponse;
this.ReactionReponseService.AddReponse(r,id,this.currentuser.id).subscribe(
response => { 
  for(let i=0;i<this.Chatrooms.length;i++){
    for(let j=0;j<this.Chatrooms[i].messages.length;j++){
      if(this.Chatrooms[i].messages[j].messageId==id){
        this.Chatrooms[i].messages[j].reponse=response;
        this.OnDblClickHover(id);
      }
    }
  }
},
 error => {
  this.toastr.error(error, 'Error', {
    toastClass:"toast-error"
  });
});
}
UpdateReponse(id:number,idr:number){
this.ReactionReponseService.UpdateReponse(idr,this.messagResponse).subscribe(
response => { 
  for(let i=0;i<this.Chatrooms.length;i++){
    for(let j=0;j<this.Chatrooms[i].messages.length;j++){
      if(this.Chatrooms[i].messages[j].messageId==id){
        this.Chatrooms[i].messages[j].reponse=response;
        this.OnDblClickHover(id);
      }
    }
  }
},
 error => {
  this.toastr.error(error, 'Error', {
    toastClass:"toast-error"
  });
});
}
initializeaddForm(): void {
  this.addchatroomforum = this.formBuilder.group({
    description: ['', Validators.required],
    nom: ['', Validators.required],
    status: [this.isPublicadd, Validators.required],
  });
}
callappelle(){
  this.appelle=true;
  this.roomidappele=this.selctedchattroom.chatRoomId.toString();
  const appID =1190772658 ;
  const serverSecret = "133ed35b065b8da7880c6d976a3d41e5";
 
  const kitToken =ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,this.roomidappele,generateRandomString(5), this.username);
   this.zp = ZegoUIKitPrebuilt.create(kitToken);
  this.zp.joinRoom({
    container: this.root.nativeElement,
    sharedLinks: [
      {
        name: 'Personal link',
        url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
          '?roomID=' +
          this.roomidappele,
      },
    ],
    scenario: {
      mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
    },
  });
}
closeappelle(){
  this.appelle=false;
}
initializeeditForm(): void {
  this.editchatroomforum = this.formBuilder.group({
    description: ['', Validators.required],
    nom: ['', Validators.required],
    status: ['', Validators.required],
    id: ['', Validators.required]
  });
}
toggleStatus() {
  this.isPublicadd = !this.isPublicadd;
  this.addchatroomforum.patchValue({ status: this.isPublicadd });
}
toggleStatusedit() {
  this.isPublicedit = !this.isPublicedit;
  this.editchatroomforum.patchValue({ status: this.isPublicedit });
}
select(c:Chatrromassistance){
  if(c.isitowner || c.isitinthelis){
    this.selctedchattroom=c;
  }
  else{
    this.idroom=c.chatRoomId;
    this.openjoindre();
  }
  
}
openadforum(){
  this.openaddforum=true;
}
closeaddforum(){
  this.openaddforum=false;
}
onadd(){
  if(this.addchatroomforum.valid){
    let c =new Chatrromassistance();
    c.description=this.addchatroomforum.get('description')!.value;
    c.nom=this.addchatroomforum.get('nom')!.value;
    c.status=this.addchatroomforum.get('status')!.value;
    this.ChatroomMessageService.AddChatroom(c,this.currentuser.id).subscribe(
      response => {
          this.Chatrooms.push(response);
          this.idroom=response.chatRoomId;
          this.openinvite();
          this.closeaddforum();
      },
      error => {
        this.toastr.error(error, 'Error', {
          toastClass:"toast-error"
        });
      });
  }
  else{
    
    this.toastr.error('Please fill out all fields', 'Error', {
      toastClass:"toast-error"
    });
  }
  
}
openinvite(){
this.openivt=true;
}
closeinvite(){
  this.openivt=false;
}
toggleUser(userId: number, event: any): void {
  const isChecked = event.target.checked;
  if (isChecked) {
    this.selectedUserIds.push(userId);
  } else {
    const index = this.selectedUserIds.indexOf(userId);
    if (index !== -1) {
      this.selectedUserIds.splice(index, 1);
    }
  }
}

isUserSelected(userId: number): boolean {
  return this.selectedUserIds.includes(userId);
}
Inviite(){
  this.ChatroomMessageService.invite(this.selectedUserIds,this.idroom).subscribe(
    response => {
        for(let i=0 ;i<this.Chatrooms.length;i++){
          if(response.chatRoomId==this.Chatrooms[i].chatRoomId){
            this.Chatrooms[i]=response;
            this.Chatrooms[i].isitowner=true;
            this.Chatrooms[i].isitinthelis=false;
          }
        }
        this.closeinvite();
    },
    error => {
      this.toastr.error(error, 'Error', {
        toastClass:"toast-error"
      });
    });
  
}
openjoindre(){
  this.openj=true;
}
closejoindre(){
  this.openj=false;
}
joindre(){
  this.ChatroomMessageService.joindre(this.currentuser.id,this.idroom).subscribe(
    response => {
        for(let i=0 ;i<this.Chatrooms.length;i++){
          if(response.chatRoomId==this.Chatrooms[i].chatRoomId){
            this.Chatrooms[i]=response;
            this.Chatrooms[i].isitowner=false;
            this.Chatrooms[i].isitinthelis=true;
          }
        }
        this.closejoindre();
        this.selctedchattroom=response;
        this.toastr.success("You have joined this room", 'success', {
          toastClass:"toast-error"
        });
      
    },
    error => {
      this.toastr.error(error, 'Error', {
        toastClass:"toast-error"
      });
    });
}
opened(c:Chatrromassistance){
this.openedit=true;
this.editchatroomforum.patchValue({ 
  status:c.status||'',
  description:c.description ||'',
  nom:c.nom||'',
  id:c.chatRoomId||''
 });
 this.isPublicedit=c.status;
}
closeedit(){
this.openedit=false;
}
delteromm(id:number){
this.ChatroomMessageService.deleteChaatroom(id).subscribe(
  response => {
     location.reload();
    
  },
  error => {
    this.toastr.error(error, 'Error', {
      toastClass:"toast-error"
    });
  });
}
onedit(){
if(this.editchatroomforum.valid){
  let c =new Chatrromassistance();
  c.description=this.editchatroomforum.get('description')!.value;
  c.nom=this.editchatroomforum.get('nom')!.value;
  c.status=this.editchatroomforum.get('status')!.value;
  c.chatRoomId=this.editchatroomforum.get('id')!.value;
  this.ChatroomMessageService.updateChatroom(c).subscribe(
    response => {
      for(let i=0 ;i<this.Chatrooms.length;i++){
        if(response.chatRoomId==this.Chatrooms[i].chatRoomId){
          this.Chatrooms[i]=response;
          this.Chatrooms[i].isitowner=true;
            this.Chatrooms[i].isitinthelis=false;
        }
      }
      this.closeedit();
    },
    error => {
      this.toastr.error(error, 'Error', {
        toastClass:"toast-error"
      });
    });
}
else{
  
  this.toastr.error('Please fill out all fields', 'Error', {
    toastClass:"toast-error"
  });
}

}
addmessage(id:number){
let m=new MessageChattrom();
m.content=this.messageadd;
this.ChatroomMessageService.AddMessage(m,id,this.currentuser.id).subscribe(
  response => {
    this.messageadd='';
    for(let i=0 ;i<this.Chatrooms.length;i++){
      if(id==this.Chatrooms[i].chatRoomId){
        this.Chatrooms[i].messages.push(response);
        for(let j=0 ;j<this.Chatrooms[i].messages.length;j++){
          if(this.Chatrooms[i].messages[j].messageId==response.messageId){
            this.Chatrooms[i].messages[j].isityourcomment=true;  
          }
        }
        
      }
    }
    this.closeedit();
  },
  error => {
    this.toastr.error(error, 'Error', {
      toastClass:"toast-error"
    });
  });

}

deleteMessage(id:number,idc:number){
  this.ChatroomMessageService.deleteMessage(id).subscribe(
    response => {
      this.idmessage=0;
      for(let i=0 ;i<this.Chatrooms.length;i++){
        if(this.Chatrooms[i].chatRoomId==idc){
          this.Chatrooms[i].messages= this.Chatrooms[i].messages.filter(item => item.messageId !== id);
        }
      }
    },
    error => {
      this.toastr.error(error, 'Error', {
        toastClass:"toast-error"
      });
    });
}
updateMessage(id:number){
  let m=new MessageChattrom();
  m.content=this.messagedit;
  m.messageId=this.idmessage;
  this.ChatroomMessageService.UpdateMessage(m).subscribe(
    response => {
      this.messagedit='';
      for(let i=0 ;i<this.Chatrooms.length;i++){
        if(id==this.Chatrooms[i].chatRoomId){
          for(let j=0 ;j<this.Chatrooms[i].messages.length;j++){
            if(this.Chatrooms[i].messages[j].messageId==response.messageId){
              this.Chatrooms[i].messages[j]=response;
              this.Chatrooms[i].messages[j].isityourcomment=true;  
            }
          }
          
        }
      }
      this.closeedit();
    },
    error => {
      this.toastr.error(error, 'Error', {
        toastClass:"toast-error"
      });
    });
}
filterChatrooms() {
  if (this.searchText.trim() !== '') {
  
    this.filteredChatrooms = this.Chatrooms.filter(item =>
      item.owner.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  } else {
    this.filteredChatrooms = this.Chatrooms;
  }
}

}
