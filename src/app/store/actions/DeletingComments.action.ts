import {Action} from '@ngrx/store';




export const DELETE_COMMENT = '[DELETE COMMENT] Delete Comment';
export const DELETE_COMMENT_SUCCESS = '[DELETE COMMENT] Delete Comment Success';
export const DELETE_COMMENT_FAIL = '[DELETE COMMENT] Delete Comment Fail';




export class DeleteComment implements Action {
  readonly type = DELETE_COMMENT;
  constructor(public parentIndex: number, public replyIndex: number | null, public commentId: number, public numberOfCommentsToBeDeleted: number | any) {}
}


export class DeleteCommentSuccess implements Action {
  readonly type = DELETE_COMMENT_SUCCESS;
  constructor(public parentIndex: number, public replyIndex: number | null) {}
}


export class DeleteCommentFail implements Action {
  readonly type = DELETE_COMMENT_FAIL;
  constructor(public parentIndex: number, public replyIndex: number | null) {}
}


export type DeleteCommentActions = DeleteComment | DeleteCommentSuccess | DeleteCommentFail;
