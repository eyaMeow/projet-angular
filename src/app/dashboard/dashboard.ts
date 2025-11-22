import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  author: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  posts = signal<Post[]>([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      image: 'https://picsum.photos/600/400?random=1',
      caption: 'Just launched my new design portfolio! So excited',
      likes: 42,
      liked: false,
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=2',
      image: 'https://picsum.photos/600/400?random=2',
      caption: 'Coffee + Code = Perfect morning',
      likes: 89,
      liked: true,
    },
    {
      id: 3,
      author: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      image: 'https://picsum.photos/600/400?random=3',
      caption: 'Sunset vibes from Bali',
      likes: 156,
      liked: false,
    },
  ]);

  toggleLike(post: Post) {
    this.posts.update((all) =>
      all.map((p) =>
        p.id === post.id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }
}
