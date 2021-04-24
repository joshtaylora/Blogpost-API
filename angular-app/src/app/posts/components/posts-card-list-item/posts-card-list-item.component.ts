import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@posts/models/post.model';
import { PostStore } from '@posts/services/post.store';

@Component({
  selector: 'app-posts-card-list-item',
  templateUrl: './posts-card-list-item.component.html',
  styleUrls: ['./posts-card-list-item.component.css']
})
export class PostsCardListItemComponent implements OnInit {
  @Input() post: Post;
  constructor(public postStore: PostStore) { }

  ngOnInit(): void {
  }

}
