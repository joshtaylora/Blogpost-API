import { Input, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostEditorComponent } from '@posts/components/post-editor/post-editor.component';
import { User } from '../../../models/user.model';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { PostsService } from '@posts/services/posts.service';
import { Token } from 'src/app/models/token.model';
import { PostStore } from '@posts/services/post.store';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.css'],
})
export class PostHomeComponent implements OnInit, OnDestroy{
  sub: Subscription;
  postId: number;

  @Input() post: Post;
  saveSuccess: boolean;
  message: string;
  token: Token;
  @Input() isEditable: boolean;
  @Input() showMenu: boolean;
  showSaveBtn: boolean;
  user: User | null = null;
  @ViewChild(PostEditorComponent) editor: PostEditorComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public postStore: PostStore,
    private postSvc: PostsService,
    private auth: AuthTokenStore
  ) {
    this.post = this.router.getCurrentNavigation().extras.state.post;
    console.log(this.post);
  }

  ngOnInit(): void {

    this.postId = +this.route.snapshot.paramMap.get('postId');

    this.auth.token$.subscribe((token) => {
      this.token = token;
      this.user = token.UserData;
    });

  }

  saveContent(savedContent: string) {
    this.post.content = savedContent;
    let post$ = this.postStore.updatePost(this.post.postId, this.post);
    post$.subscribe(
      (res)=> {
        this.saveSuccess = true;
        this.message = `Post with title ${this.post.title} was successfullly saved`
      }, (error)=> {
        this.saveSuccess = false;
        this.message = error;
      }
    )
  }

  ngOnDestroy() {

  }

}
