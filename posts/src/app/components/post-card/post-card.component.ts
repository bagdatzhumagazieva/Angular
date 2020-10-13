import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {IComment, IPost } from 'src/app/modules';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;
  comments: IComment[];
  showComment = false;
  userComment = '';
  userName = '';

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
  }

  setShowComment = () => {
    this.showComment = !this.showComment;
    if (!this.comments) {
      this.postsService.getPostComment(this.post.id).subscribe((json: IComment[]) => this.comments = json);
    }
  }

  createComment = () => {
    this.postsService.addComment({
      body: this.userComment,
      postId: this.post.id,
      name: this.userName,
    }).subscribe((data: any) => {
      if (data) {
        this.postsService.getPostComment(this.post.id).subscribe((json: IComment[]) => this.comments = json);
        this.userComment = '';
        this.userName = '';
      }
    });
  }

}
