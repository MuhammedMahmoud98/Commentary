import {Action} from '@ngrx/store';
import {CommentContainer, Post} from '../../models/comments.model';



export const LOAD_COMMENTS = '[Comments] Load Comments';
export const LOAD_COMMENTS_SUCCESS = '[Comments] Load Comments Success';
export const LOAD_COMMENTS_FAIL = '[Comments] Load Comments Fail';
export const CLOSE_SUCCESS_ALERT = '[Comments] Close Success Alert';
export const INCREASE_COMMENTS = '[Comments] Increase Comments';
export const DECREASE_COMMENTS = '[Comments] Decrease Comments';
export const TOGGLE_LIKE_COMMENT = '[Comments] Toggle Like Comment';


export class LoadComments implements Action {
  readonly type = LOAD_COMMENTS;
}


export class  LoadCommentsSuccess implements Action {
  readonly type = LOAD_COMMENTS_SUCCESS;

  constructor(public payload: CommentContainer[] | undefined, public commentsCount: any) {}
}

export class LoadCommentsFail implements Action {
  readonly type = LOAD_COMMENTS_FAIL;
  constructor(public payload: any) {}
}

export class CloseSuccessAlert implements Action {
  readonly type = CLOSE_SUCCESS_ALERT;
}


export class IncreaseComments implements Action {
  readonly type = INCREASE_COMMENTS;
}

export class DecreaseComments implements Action {
  readonly type = DECREASE_COMMENTS;
  constructor(public numberOfComments: any) {}
}

export class ToggleLikeComment implements Action {
  readonly type = TOGGLE_LIKE_COMMENT;
  constructor(public parentIndex: number, public replyIndex: number | null) {}
}


export type CommentActions =
  LoadComments | LoadCommentsSuccess | LoadCommentsFail | CloseSuccessAlert | IncreaseComments | DecreaseComments | ToggleLikeComment;
