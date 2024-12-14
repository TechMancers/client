import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommentInterface } from '../../../interfaces/comment.interface';
import { ActiveCommentInterface } from '../../../interfaces/activeComment.interface';
import { CommentsService } from '../../../services/comments.service';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() currentUserId!: string;
  @Input() artworkId!: string;
  @Input() userPhoto!:string;
  @Input() comments: CommentInterface[] = [];
  @Output() commentsCount = new EventEmitter<number>();
  
  activeComment: ActiveCommentInterface | null = null;
  showComments: boolean = false;

  constructor(private commentsService: CommentsService) {}


  ngOnInit(): void {
    this.fetchComments();
  }

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['artworkId'] && !changes['artworkId'].firstChange){
      this.fetchComments();
    }
  }

  fetchComments(){
    this.commentsService.getComments(this.artworkId, this.currentUserId).subscribe((comments: CommentInterface[]) => {
      this.comments = comments;
      console.log(comments,'commengts');
      this.commentsCount.emit(this.comments.length);
    });
    (error: any)=>{
      console.error('Error fetching comments:', error);
    }
  }

  getRootComments(): CommentInterface[] {
    return this.comments.filter((comment) => comment.parent_comment_id === null);
  }
  getRepliesCount(commentId: string): number {
    return this.comments.filter((comment) => comment.parent_comment_id === commentId).length;
  }

  updateComment(text: string, commentId: string): void {
    this.commentsService.updateComment(commentId, text).subscribe(
      (updatedComment: CommentInterface) => {
        // Update the local comments array
        this.comments = this.comments.map((comment) => 
          comment.comment_id === commentId ? updatedComment : comment
        );
        this.commentsCount.emit(this.comments.length);
        this.activeComment = null;
      },
      (error: any) => {
        console.error('Error updating comment:', error);
      }
    );
  }
  
  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter(
          (comment) => comment.comment_id !== commentId
        );
        this.commentsCount.emit(this.comments.length);
        console.log('after delete',this.commentsCount);
      },
      (error: any) => {
        console.error('Error deleting comment:', error);
      }
    );
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  addComment({ text, parentId }: { text: string; parentId: string | null }): void {
    const artworkId = this.artworkId;
    const userId = this.currentUserId; 
  
    this.commentsService.createComment(text, artworkId, userId, parentId).subscribe(
      (response: any) => {
        const createdComment: CommentInterface = response.comment;
        createdComment.profile_photo_url = this.userPhoto;

        if (parentId) {
          this.comments.push(createdComment);
        } else {
          // Append the new root comment
          this.comments.push(createdComment);
        }
        this.commentsCount.emit(this.comments.length);
        this.activeComment = null;
        this.showComments = true;
      },
      (error: any) => {
        console.error('Error adding comment:', error);
      }
    );
  }
  
  toggleComments(): void {
    this.showComments = !this.showComments;
  }


  getReplies(commentId: string): CommentInterface[] {
    return this.comments.filter((comment) => comment.parent_comment_id === commentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
}
