import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveCommentInterface } from '../../../interfaces/activeComment.interface';
import { ActiveCommentTypeEnum } from '../../../interfaces/activeCommentType.enum';
import { CommentInterface } from '../../../interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{

  @Input() comment!: CommentInterface;
  @Input() activeComment!: ActiveCommentInterface | null;
  @Input() replies!: CommentInterface[];
  @Input() currentUserId!: string;
  @Input() parentId!: string | null;
  @Input() repliesCount!: number;

  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output()
  deleteComment = new EventEmitter<string>();
  @Output()
  addComment = new EventEmitter<{ text: string; parentId: string | null }>();
  @Output()
  updateComment = new EventEmitter<{ text: string; commentId: string }>();

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;
  showActions: boolean = false;
  showReplies: boolean = false;

  get profilePhoto(): string {
    return this.comment.profile_photo_url || 'assets/user-icon.png';
  }

  ngOnInit(): void {
    const fiveMinutes = 300000;
    const timePassed =
      new Date().getTime() - new Date(this.comment.created_at).getTime() > fiveMinutes;
  
    this.createdAt = new Date(this.comment.created_at).toLocaleDateString();
    this.canReply = Boolean(this.currentUserId);

    if (
      this.currentUserId == this.comment.user_id &&
      !this.isReplying()
    ) {
      this.canEdit = true;
    }

    if (
      this.currentUserId == this.comment.user_id &&
      this.replies.length === 0 &&
      !this.isReplying()
    ) {
      this.canDelete = true;
    }
    this.replyId = this.parentId ? this.parentId : this.comment.comment_id;
  }
  
  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.comment_id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.comment_id &&
      this.activeComment.type === this.activeCommentType.editing
    );
  }
  toggleCommentActions(): void {
    this.showActions = !this.showActions;
  }
  toggleReplies(): void {
    this.showReplies = !this.showReplies;
  }
}
