import {Component, Input, OnInit} from '@angular/core';
import {animate, group, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers/comments.reducer';
import {CloseSuccessAlert} from '../../store/actions/comments.action';

@Component({
  selector: 'app-post-error',
  templateUrl: './post-error.component.html',
  styleUrls: ['./post-error.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-200%)', opacity: '0'}),
        group([
          animate(200, style({opacity: '1'})),
          animate('200ms ease-in', style({transform: 'translateX(0)'})),
        ])
      ]),
      transition(':leave', [
        group([
          animate('200ms ease-in', style({transform: 'scale(0)'}))
        ]),
      ])
    ])
  ]
})
export class PostErrorComponent implements OnInit {
  @Input() errorMessage!: string;
  @Input() errorBoolean!: Observable<boolean>;
  @Input() alertType!: string;
  constructor(private store: Store<{comments: State}>) { }

  ngOnInit(): void {
  }

  closeSuccessAlert(): void {
    this.store.dispatch(new CloseSuccessAlert());
  }
}
