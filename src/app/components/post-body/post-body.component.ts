import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers/comments.reducer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {
  // variables
  isLiked = false;
  commentsCounter$!: Observable<number>;
  constructor(private store: Store<{comments: State}>) { }

  ngOnInit(): void {
    this.storeSubscription();
  }

  storeSubscription(): void {
    // @ts-ignore
    this.commentsCounter$ = this.store.select('comments').pipe(map((res) => res.commentsCount));
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

}
