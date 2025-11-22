import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Friend {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
})
export class Users {
  friends = signal<Friend[]>([
    { id: 1, name: 'Alex Rivera', username: '@alexr', avatar: 'https://i.pravatar.cc/150?img=5' },
    {
      id: 2,
      name: 'Maria Garcia',
      username: '@maria_g',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    { id: 3, name: 'James Lee', username: '@jameslee', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 4, name: 'Sofia Patel', username: '@sofia_p', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 5, name: 'David Kim', username: '@davidkim', avatar: 'https://i.pravatar.cc/150?img=9' },
  ]);

  unfriend(friendId: number) {
    this.friends.update((list) => list.filter((f) => f.id !== friendId));
  }
}
