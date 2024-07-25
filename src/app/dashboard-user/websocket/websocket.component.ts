import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-websocket',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterOutlet],
  templateUrl: './websocket.component.html',
  styleUrl: './websocket.component.css'
})
export class WebsocketComponent implements OnInit{
  messageInput: string = '';
  messages: any[] = [];

  constructor(private chatService: WebsocketService) { }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.messageInput.trim() !== '') {
      this.chatService.sendMessage(this.messageInput);
      this.messageInput = '';
    }
  }
}