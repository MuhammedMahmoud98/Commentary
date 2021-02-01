import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {CommentContainer, CommentDetails, Post} from '../../models/comments.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  headerPrototype = {
    headers: {
      'x-api-key': `${environment.apiKey}`,
      'x-mock-response-code': '200',
      'x-mock-response-name': 'static',
    }
  };

  constructor(private http: HttpClient) { }


  getPostComments(): Observable<Post> {
    return this.http.get(`${environment.apiUrl}comments`, this.headerPrototype);
  }
  // Observable of type any because i dont know the response of mock api, it should return the comment object.
  createNewComment(commentBody: CommentContainer): Observable<any> {
    return this.http.post(`${environment.apiUrl}comments`, commentBody, this.headerPrototype);
  }

  updateComment(parentId: number, updateBody: CommentContainer): Observable<any> {
    return this.http.put(`https://acc07519-c837-44ed-9a24-93a1df1ed16b.mock.pstmn.io/v1/comments/${parentId}`, updateBody, this.headerPrototype);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}comments/${commentId}`, this.headerPrototype);
  }
}
