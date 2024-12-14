export interface CommentInterface {
  comment_id: string;
  content: string;
  username: string;
  user_id: string;
  parent_comment_id: null | string;
  created_at: string;
  updated_at: string;
  profile_photo_url: string;
}
