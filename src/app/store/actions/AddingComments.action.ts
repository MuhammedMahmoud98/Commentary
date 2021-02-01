import {Action} from '@ngrx/store';
import {CommentContainer} from '../../models/comments.model';



export const ADD_COMMENT = '[ADD COMMENT] Add Comment';
export const ADD_COMMENT_SUCCESS = '[ADD COMMENT] Add Comment Success';
export const ADD_COMMENT_FAIL = '[ADD COMMENT] Add Comment Fail';



export class AddComment implements Action {
  readonly type = ADD_COMMENT;

  constructor(public payload: CommentContainer, public index: number | null) {}
}


export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;
  constructor(public payload: CommentContainer) {}
}

export class AddCommentFail implements Action {
  readonly type = ADD_COMMENT_FAIL;
}


export type AddingCommentActions = AddComment | AddCommentSuccess | AddCommentFail;
