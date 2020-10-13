import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IPost, IUserFilter } from 'src/app/modules';
import {AuthenticationService} from '../../services/authontication.service';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  posts: IPost[];
  users: IUserFilter[];
  selectedValue: string;
  constructor(
    public authenticationService: AuthenticationService,
    public postsService: PostsService,
    ) { }

  ngOnInit(): void {
    this.authenticationService.getUsers().subscribe((data: any[]) =>
      this.users = data.map(e => ({id: e.id, name: e.name})));
    this.postsService.getPost().subscribe((data: IPost[]) => {
        this.posts = data;
      }
    );
    this.authenticationService.isAuthorized();
  }

  getPostsByUser = () => {
    this.postsService.getPost(+this.selectedValue).subscribe((data: IPost[]) => {
      this.posts = data;
    });
  }
}
