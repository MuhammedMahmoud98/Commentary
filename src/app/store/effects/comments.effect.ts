import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {CommentsService} from '../../services/comments/comments.service';
import {DecreaseComments, LOAD_COMMENTS, LoadCommentsFail, LoadCommentsSuccess} from '../actions/comments.action';
import {PostClass} from '../../models/comments.model';
import {ADD_COMMENT, AddCommentFail, AddCommentSuccess} from '../actions/AddingComments.action';
import {EDIT_COMMENT, EditCommentFail, EditCommentSuccess} from '../actions/EdditComments.action';
import {DELETE_COMMENT, DeleteCommentFail, DeleteCommentSuccess} from '../actions/DeletingComments.action';

@Injectable()
export class CommentsEffect {
  constructor(private action$: Actions, public commentsService: CommentsService) {
  }

  // @Effect() loadComments$ = createEffect(() => this.action$.pipe(
  //   ofType(LOAD_COMMENTS),
  //   mergeMap(() => this.commentsService.getPostComments()
  //     .pipe(
  //     map((postResponse) => new LoadCommentsSuccess(PostClass.newCommentsTree(postResponse?.comments?.data
  //       ?.map(comment => ({...comment, editing: false, isLoading: false, hasError: false}))))),
  //     catchError( (err) => of(new LoadCommentsFail(err)))
  //   ))
  // ));


  @Effect() loadComments$ = createEffect(() => this.action$.pipe(
    ofType(LOAD_COMMENTS),
    mergeMap((action) => this.commentsService.getPostComments()
      .pipe(
        map(postResponse => ({commentsCount: postResponse.comments?.meta?.numberOfComments, commentsList: postResponse.comments?.data
            ?.map(comment => ({...comment, editing: false, isLoading: false, hasError: false, isLiked: false}))})),
        map((editedResponse) => new LoadCommentsSuccess(PostClass.newCommentsTree(editedResponse?.commentsList), editedResponse?.commentsCount)),
        catchError( (err) => of(new LoadCommentsFail(err)))
      ))
  ));

  // i passed the same object because the returned response of mock API is an id, it suppose to return the comment object from the server.
  @Effect({dispatch: false}) createComment$ = createEffect(() => this.action$.pipe(
    ofType(ADD_COMMENT),
    mergeMap((action) => this.commentsService.createNewComment(action['payload']).pipe(
      map((commentResponse) => new AddCommentSuccess(action['payload']), console.log(action)),
      catchError((err) => of(new AddCommentFail()))
    ))
  ));


  @Effect({dispatch: false}) updateComment$ = createEffect(() => this.action$.pipe(
    ofType(EDIT_COMMENT),
    mergeMap((action) => this.commentsService.updateComment(action['payload']['id'], action['payload']).pipe(
      map((commentResponse) => new EditCommentSuccess(), console.log(action)),
      catchError((err) => of(new EditCommentFail(action['oldComment'], action['parentIndex'], action['replyIndex'])))
    ))
  ));


  @Effect({dispatch: false}) deleteComment$ = createEffect(() => this.action$.pipe(
    ofType(DELETE_COMMENT),
    mergeMap((action) => this.commentsService.deleteComment(action['commentId']).pipe(
      // tslint:disable-next-line:no-unused-expression
       mergeMap((deleteResponse) => [
         new DeleteCommentSuccess(action['parentIndex'], action['replyIndex']),
         new DecreaseComments(action['numberOfCommentsToBeDeleted'])
       ]),
      catchError((err) => of(new DeleteCommentFail(action['parentIndex'], action['replyIndex'])))
    ))
  ));
}
