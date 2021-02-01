import {CommentContainer} from '../../models/comments.model';
import {
  CLOSE_SUCCESS_ALERT,
  CommentActions,
  DECREASE_COMMENTS,
  INCREASE_COMMENTS,
  LOAD_COMMENTS,
  LOAD_COMMENTS_FAIL,
  LOAD_COMMENTS_SUCCESS
} from '../actions/comments.action';
import {ADD_COMMENT, ADD_COMMENT_FAIL, ADD_COMMENT_SUCCESS, AddingCommentActions} from '../actions/AddingComments.action';
import {
  CLOSE_EDIT_INPUT,
  EDIT_COMMENT,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_SUCCESS,
  EditingCommentActions,
  OPEN_EDIT_INPUT
} from '../actions/EdditComments.action';
import {DELETE_COMMENT, DELETE_COMMENT_FAIL, DELETE_COMMENT_SUCCESS, DeleteCommentActions} from '../actions/DeletingComments.action';


export interface State {
  commentsList?: CommentContainer[];
  loading?: boolean;
  errorOccurred?: boolean;
  commentIsLoading?: boolean;
  successOccurred?: boolean;
  commentsCount?: number | any;
}


const initialState: State = {
  commentsList: [],
  loading: false,
  errorOccurred: false,
  commentIsLoading: false,
  successOccurred: false,
  commentsCount: 0
};


export function commentsReducer(state = initialState, action: CommentActions | AddingCommentActions | EditingCommentActions | DeleteCommentActions) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        commentsList: action.payload,
        errorOccurred: false,
        commentsCount: action.commentsCount
      };
    case LOAD_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        errorOccurred: true
      };
    case ADD_COMMENT:
      const oldState = {...state};
      // @ts-ignore
      const newCommentsList = JSON.parse(JSON.stringify(oldState.commentsList)); // taking shallow copy of whole tree data structure.

      console.log(newCommentsList, 'PAYLOADDDD');
      if (!action.index && action.index !== 0) {
        newCommentsList.unshift(action.payload);
      } else {
        newCommentsList[action.index].replies.push(action.payload);
      }
      return {
        ...state,
        commentsList: newCommentsList
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        errorOccurred: false
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        errorOccurred: true
      };
    case OPEN_EDIT_INPUT:
      const stateCopy = {...state};
      const newCommentsListCopy = JSON.parse(JSON.stringify(stateCopy.commentsList));
      if (!action.replyIndex && action.replyIndex !== 0) {
        newCommentsListCopy[action.parentIndex].editing = true;
      } else {
        newCommentsListCopy[action.parentIndex].replies[action.replyIndex].editing = true;
      }
      return {
        ...state,
        commentsList: newCommentsListCopy
      };
    case CLOSE_EDIT_INPUT:
      const stateCloseCopy = {...state};
      const closeCommentsListCopy = JSON.parse(JSON.stringify(stateCloseCopy.commentsList));
      console.log('PARENT', action.parentIndex, 'REPLIES', action.replyIndex);
      if (!action.replyIndex && action.replyIndex !== 0) {
        closeCommentsListCopy[action.parentIndex].editing = false;
      } else {
        closeCommentsListCopy[action.parentIndex].replies[action.replyIndex].editing = false;
      }
      return {
        ...state,
        commentsList: closeCommentsListCopy
      };
    case EDIT_COMMENT:
      const editStateCopy = {...state};
      const editCommentsListCopy = JSON.parse(JSON.stringify(editStateCopy.commentsList));

      if (!action.replyIndex && action.replyIndex !== 0) {
        editCommentsListCopy[action.parentIndex] = action.payload;
      } else {
        editCommentsListCopy[action.parentIndex].replies[action.replyIndex] = action.payload;
      }

      return {
        ...state,
        commentsList: editCommentsListCopy
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        errorOccurred: false
      };
    case EDIT_COMMENT_FAIL:
      const editStateFailCopy = {...state};
      const editCommentsListFailCopy = JSON.parse(JSON.stringify(editStateFailCopy.commentsList));

      if (!action.replyIndex && action.replyIndex !== 0) {
        editCommentsListFailCopy[action.parentIndex] = action.oldComment;
      } else {
        editCommentsListFailCopy[action.parentIndex].replies[action.replyIndex] = action.oldComment;
      }
      return {
        ...state,
        commentsList: editCommentsListFailCopy,
        errorOccurred: true
      };
    case DELETE_COMMENT:
      const deleteStateCopy = {...state};
      const deleteCommentsListCopy = JSON.parse(JSON.stringify(deleteStateCopy.commentsList));

      if (!action.replyIndex && action.replyIndex !== 0) {
        deleteCommentsListCopy[action.parentIndex].isDeleting = true;
      } else {
        deleteCommentsListCopy[action.parentIndex].replies[action.replyIndex].isDeleting = true;
      }

      return {
        ...state,
        commentsList: deleteCommentsListCopy,
        errorOccurred: false
      };


    case DELETE_COMMENT_SUCCESS:
      const deleteStateSuccessCopy = {...state};
      const deleteCommentsListSuccessCopy = JSON.parse(JSON.stringify(deleteStateSuccessCopy.commentsList));

      if (!action.replyIndex && action.replyIndex !== 0) {
        deleteCommentsListSuccessCopy.splice(action.parentIndex, 1);
      } else {
        deleteCommentsListSuccessCopy[action.parentIndex].replies.splice(action.replyIndex, 1);
      }
      return {
        ...state,
        commentsList: deleteCommentsListSuccessCopy,
        errorOccurred: false,
        successOccurred: true
      };

    case DELETE_COMMENT_FAIL:
      const deleteStateFailCopy = {...state};
      const deleteCommentsListFailCopy = JSON.parse(JSON.stringify(deleteStateFailCopy.commentsList));

      if (!action.replyIndex && action.replyIndex !== 0) {
        deleteCommentsListFailCopy[action.parentIndex].isDeleting = false;
      } else {
        deleteCommentsListFailCopy[action.parentIndex].replies[action.replyIndex].isDeleting = false;
      }
      return {
        ...state,
        commentsList: deleteCommentsListFailCopy,
        errorOccurred: true,
        successOccurred: false
      };
    case CLOSE_SUCCESS_ALERT:
      return {
        ...state,
        successOccurred: false
      };
    case INCREASE_COMMENTS:
      const commentsCountCopy = {...state};
      commentsCountCopy.commentsCount++;
      return {
        ...state,
        commentsCount: commentsCountCopy.commentsCount
      };
    case DECREASE_COMMENTS:
      const commentsCountDecreaseCopy = {...state};
      if (!isNaN(action.numberOfComments) && action.numberOfComments !== 0) {
        commentsCountDecreaseCopy.commentsCount -= (action.numberOfComments + 1);
      } else {
        commentsCountDecreaseCopy.commentsCount--;
      }
      console.log(action, 'DECREASE');
      return {
        ...state,
        commentsCount: commentsCountDecreaseCopy.commentsCount
      };
    default:
      return state;
  }
}









