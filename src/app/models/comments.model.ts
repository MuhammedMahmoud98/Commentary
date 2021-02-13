
export interface Post {
  comments?: CommentDetails;
}

export interface CommentDetails {
  meta?: Meta;
  data?: CommentContainer[];
}

export interface Meta {
  numberOfComments?: number;
}

export interface CommentContainer {
  id?: number;
  parentId?: number | null;
  timestamp?: number;
  user?: User;
  title?: string;
  comment?: string;
  replies?: RepliesContainer[];
  editing?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  isDeleting?: boolean;
  isLiked?: boolean;
}



export interface RepliesContainer {
  id?: number;
  parentId?: number;
  timestamp?: number;
  user?: User;
  title?: string;
  comment?: string;
  editing?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  isDeleting?: boolean;
  isLiked?: boolean;
}



export interface User {
  name?: string;
  email?: string;
}



export class PostClass {
  constructor() {}

  public static newCommentsTree(comments: CommentContainer[] | undefined): CommentContainer[] | undefined {
    // @ts-ignore
    const parentComments = comments.filter(comment => !comment?.parentId && comment?.parentId !== 0);

    // getting all childes of parent comment
    const getAllChildes = (parentCommentId: number | undefined): RepliesContainer[] => {
      // @ts-ignore
      return comments.filter(comment => comment.parentId === parentCommentId);
    };


    const getAllNestedReplies = (parentCommentId: number | undefined, replies: RepliesContainer[] = []) => {

      const childComments = getAllChildes(parentCommentId); // search for first level of childs

      if (!childComments.length) {
        return [];
      } // return from the recursive function while looping

      for (const childComment of childComments) {
        console.log('test'); // for testing
        // @ts-ignore
        replies.push(childComment);
        getAllNestedReplies(childComment.id, replies);
      }

      return replies;
    };

    for (const singleComment of parentComments) {
      singleComment.replies = getAllNestedReplies(singleComment.id, []);
    }

    return parentComments;
  }
}
