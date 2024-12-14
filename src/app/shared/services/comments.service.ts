import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommentInterface } from '../interfaces/comment.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = environment.apiUrl + '/artwork-preview';


  getComments(artId: string, userId: string): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(`${this.apiUrl}/${artId}?userId=${userId}`)
    .pipe(
      map((response: any) => response.comments)
    );
  }

  createComment(
    text: string,
    artworkId: string,
    userId: string,
    parentId: string | null = null
  ): Observable<CommentInterface> {
    let url = `${this.apiUrl}/${artworkId}/comment`; 
    
    if (parentId !== null) {
      url = `${this.apiUrl}/${artworkId}/comment/${parentId}/reply`;
    }
    
    return this.httpClient.post<CommentInterface>(
      url,
      {
        content: text,
        artwork_id: artworkId,
        userId: userId,
        parent_comment_id: parentId,
      }
    );
  }
  
  updateComment(commentId: string, text: string): Observable<CommentInterface> {
    console.log('commentId:', commentId, 'text:', text)
    return this.httpClient.put<CommentInterface>(`${this.apiUrl}/comment/${commentId}`, {
      content: text
    }).pipe(
      map((response: any) => response.comment)
    );
  }

  deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/comment/${commentId}`);
  }

}

