import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-chat-ai',
  imports: [FormsModule, MarkdownComponent],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
})
export class ChatAiComponent implements OnInit, OnDestroy {
  chatService = inject(ChatService);

  showWindow = signal(false);
  chats = signal<ChatMessage[]>([]);

  chatWindowElement = viewChild.required<ElementRef>('chatWindow');

  promptSub = this.chatService.prompt$.subscribe((prompt) => {
    this.addMessage({ content: prompt, origin: 'agent' });
  });

  ngOnInit() {
    this.chatService.startConnection();
  }

  toggleWindow() {
    this.showWindow.update((w) => !w);
  }

  addMessage(message: ChatMessage) {
    this.chats.update((old) => {
      return [...old, message];
    });
  }

  submitMessage(f: NgForm) {
    const message = f.control.get('userMessage')?.value;

    this.addMessage({ content: message, origin: 'user' });

    const callbackFunction = () => {
      this.chatWindowElement()?.nativeElement.scrollTo({
        top: this.chatWindowElement()?.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    this.chatService.sendPrompt(message, callbackFunction);

    f.resetForm();
  }

  ngOnDestroy(): void {
    this.promptSub.unsubscribe();
    this.chatService.stopConnection();
  }
}

type ChatMessage = {
  origin: 'user' | 'agent';
  content: string;
};
