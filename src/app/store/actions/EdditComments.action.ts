import {Action} from '@ngrx/store';
import {CommentContainer} from '../../models/comments.model';


export const OPEN_EDIT_INPUT = '[Edit] Open Edit Input';
export const CLOSE_EDIT_INPUT = '[Edit] Close Edit Input';
export const EDIT_COMMENT = '[Edit] Edit Comment';
export const EDIT_COMMENT_SUCCESS = '[Edit] Edit Comment Success';
export const EDIT_COMMENT_FAIL = '[Edit] Edit Comment Fail';


export class CloseEditInput implements Action {
  readonly type = CLOSE_EDIT_INPUT;
  constructor(public parentIndex: number, public replyIndex: number | null) {}
}


export class OpenEditInput implements Action {
  readonly type = OPEN_EDIT_INPUT;
  constructor(public parentIndex: number, public replyIndex: number | null) {
  }
}

export class EditComment implements Action {
  readonly type = EDIT_COMMENT;
  constructor(public payload: CommentContainer, public oldComment: CommentContainer, public parentIndex: number, public replyIndex: number | null) {}
}

export class EditCommentSuccess implements Action {
  readonly type = EDIT_COMMENT_SUCCESS;
}

export class EditCommentFail implements Action {
  readonly type = EDIT_COMMENT_FAIL;
  constructor(public oldComment: CommentContainer, public parentIndex: number, public replyIndex: number | null) {}
}



export type EditingCommentActions = OpenEditInput | CloseEditInput | EditComment | EditCommentSuccess | EditCommentFail;
