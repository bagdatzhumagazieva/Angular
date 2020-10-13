import { Component, OnInit } from '@angular/core';
import {IPost, IUserFilter} from '../../modules';
import {AuthenticationService} from '../../services/authontication.service';
import {PostsService} from '../../services/posts.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  selectedValue: string;
  users: IUserFilter[];
  posts: IPost[];
  body = '';
  title = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    public authenticationService: AuthenticationService,
    public postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.getUsers().subscribe((data: any[]) =>
      this.users = data.map(e => ({id: e.id, name: e.name})));
    this.authenticationService.isAuthorized();
  }

  getPostsByUser = (id: number) => {
    this.postsService.getPost(id).subscribe((data: IPost[]) => {
      this.posts = data;
    });
  }

  createPost = () => {
    this.postsService.addPost({
      body: this.body,
      title: this.title.value,
      userId: +this.selectedValue,
    }).subscribe((data: IPost) => {
      if (confirm('The post created successfully')) {
        this.getPostsByUser(data.userId);
        this.body = '';
      }
    });
  }

}
