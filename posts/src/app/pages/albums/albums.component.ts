import { Component, OnInit } from '@angular/core';
import {IAlbum, IUserFilter} from '../../modules';
import {AuthenticationService} from '../../services/authontication.service';
import {AlbumsService} from '../../services/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  users: IUserFilter[];
  album: IAlbum[];
  userId = '';

  constructor(
    public authenticationService: AuthenticationService,
    public albumsService: AlbumsService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.isAuthorized();
    this.authenticationService.getUsers().subscribe((data: any[]) =>
      this.users = data.map(e => ({id: e.id, name: e.name})));
  }

  getAlbumByUser = () => {
    this.albumsService.getAlbums(+this.userId).subscribe((data: IAlbum[]) => this.album = data);
  }

  onCLickUser = () => {
    this.userId = location.pathname.split('/').pop() || '';
    this.getAlbumByUser();
  }
}
