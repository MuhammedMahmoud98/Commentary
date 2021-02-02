import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers/comments.reducer';
import {CommentsService} from '../../services/comments/comments.service';
import {CommentContainer, Post, RepliesContainer} from '../../models/comments.model';
import {DecreaseComments, IncreaseComments, LoadComments} from '../../store/actions/comments.action';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AddComment} from '../../store/actions/AddingComments.action';
import {CloseEditInput, EditComment, OpenEditInput} from '../../store/actions/EdditComments.action';
import {animate, group, style, transition, trigger} from '@angular/animations';
import {DeleteComment} from '../../store/actions/DeletingComments.action';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
  animations: [
    trigger('translateAndScale', [
      transition(':enter', [
        style({transform: 'translateY(-10px)', opacity: '0'}),
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
export class PostCommentsComponent implements OnInit {
  // variables
  loadComments$!: Observable<boolean>;
  commentText = '';
  replyCommentText = '';
  editingText = '';
  error$!: Observable<boolean>;
  commentIsDeleted$!: Observable<boolean> | any;
  // containers
  commentsList$!: Observable<CommentContainer[]>;

  constructor(private store: Store<{ comments: State }>, private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.loadAllComments();
    this.storeSubscription();
  }


  storeSubscription(): void {
    // @ts-ignore
    this.commentsList$ = this.store.select('comments').pipe(map(res => res.commentsList));
    // @ts-ignore
    this.loadComments$ = this.store.select(store => store.comments).pipe(map(comments => comments.loading));

    // @ts-ignore
    this.error$ = this.store.select(store => store.comments).pipe(map(comments => comments.errorOccurred));

    this.commentIsDeleted$ = this.store.select(store => store.comments).pipe(map(comments => comments.successOccurred));
  }


  loadAllComments(): void {
    this.store.dispatch(new LoadComments());
  }


  addNewComment(): void {
    console.log('COMMENT');
    this.store.dispatch(new AddComment(this.commentPrototype('Different opinion', 'Muhammad Mahmoud', this.commentText), null));
    this.commentText = '';
    this.increaseComments();
  }

  addNewReply(parentCommentIndex: number, parentCommentId: any, elementId: string): void {
    console.log(parentCommentIndex, 'PARENT INDEX');
    this.store.dispatch(new AddComment(this.replyPrototype('Reply Part', 'Muhammad Mahmoud', this.replyCommentText, parentCommentId), parentCommentIndex));
    this.clearInput(elementId);
    this.increaseComments();
  }

  commentPrototype(title: string, name: string, comment: string): CommentContainer {
    return {
      id: Math.floor(Math.random() * 1000),
      parentId: null,
      comment,
      user: {email: 'test@test.com', name},
      timestamp: new Date().getTime(),
      title,
      replies: [],
      editing: false,
      isLoading: false
    };
  }


  replyPrototype(title: string, name: string, comment: string, parentId: number): RepliesContainer {
    return {
      id: Math.floor(Math.random() * 1000),
      parentId,
      comment,
      user: {email: 'test@test.com', name},
      timestamp: new Date().getTime(),
      title,
      editing: false
    };
  }

  increaseComments(): void {
    this.store.dispatch(new IncreaseComments());
  }

  // decreaseComments(): void {
  //   this.store.dispatch(new DecreaseComments());
  // }

  // DELETE COMMENT PART START
  removeComment(parentIndex: number, replyIndex: number | null, commentId: any, replies: any): void {
    if (!replyIndex && replyIndex !== 0) {
      this.store.dispatch(new DeleteComment(parentIndex, null, commentId, replies.length));
    } else {
      this.store.dispatch(new DeleteComment(parentIndex, replyIndex, commentId, null));
    }
  }

  // DELETE COMMENT PART END

  // EDIT COMMENT PART START
  editComment(comment: CommentContainer, parentIndex: number, replyIndex: number | null): void {
    const newCommentCopy = {...comment};
    newCommentCopy.comment = this.editingText;

    if (!replyIndex && replyIndex !== 0) {
      this.store.dispatch(new EditComment(newCommentCopy, {...comment}, parentIndex, null));
      this.cancelEditing(parentIndex, replyIndex);
    } else {
      this.store.dispatch(new EditComment(newCommentCopy, {...comment}, parentIndex, replyIndex));
      this.cancelEditing(parentIndex, replyIndex);
    }

    this.editingText = '';
    console.log(newCommentCopy);
  }


  openCommentEdit(comment: CommentContainer, parentIndex: number, replyIndex: number | null): void {
    if (!replyIndex && replyIndex !== 0) {
      this.store.dispatch(new OpenEditInput(parentIndex, null));
    } else {
      this.store.dispatch(new OpenEditInput(parentIndex, replyIndex));
    }
  }


  cancelEditing(parentIndex: number | any, replyIndex: number | null): void {
    console.log(parentIndex, replyIndex, 'WWW');
    if (!replyIndex && replyIndex !== 0) {
      console.log('PARENT COMMENT');
      this.store.dispatch(new CloseEditInput(parentIndex, null));
    } else {
      console.log('REPLY COMMENT');
      this.store.dispatch(new CloseEditInput(parentIndex, replyIndex));
    }

  }


  takeEditableText(text: any): void {
    this.editingText = text.target.value;
  }

  // EDIT COMMENT PART END

  takingReplyText(text: any): void {
    this.replyCommentText = text.target.value;
  }



  commentDate(timeStamp: any): string {
    const timestamp = new Date(timeStamp);
    const splitDate = timestamp.toDateString().split(' ');
    return `${splitDate[1]} ${splitDate[2]}`;
  }

  invalidComment(): boolean {
    return this.commentIsEdited();
  }

  commentIsEdited(): boolean {
    return this.editingText.trim() === '';
  }

  // commentContainsBadWords(): boolean {
  //   return false;
  // }
  checkForLink(comment: any): any {
    const splittedString = comment.split(' ');

    let link;

    splittedString.forEach((part: string, i: number) => {
      if (part.startsWith('http')) {
        link = `<a href=${part} class='link' target='_blank'>${part}</a>`;
        splittedString[i] = link;
      }
    });

    return splittedString.join(' ');
  }

  clearInput(id: string): void {
    const element = document.getElementById(`${id}`) as HTMLInputElement;
    element.value = '';
  }
  trackByFn(index: number, item: any): number { // updating(render) only the changed part of the dom not all the dom
    return item.id; // or item.id
  }
}
