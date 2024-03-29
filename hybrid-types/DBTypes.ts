type UserLevel = {
  level_id: number; // REST API
  // level_id: string; // GraphQL
  level_name: 'Admin' | 'User' | 'Guest';
};

type User = {
  user_id: number; // REST API
  // user_id: string; // GraphQL
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date | string;
};

type MediaItem = {
  media_id: number; // REST API
  // media_id: string; // GraphQL
  user_id: number; // REST API
  // user_id: string; // GraphQL
  place_id: number;
  filename: string;
  media_type: string;
  thumbnail: string;
  filesize: number;
  rating: number;
  title: string;
  description: string | null;
  created_at: Date | string;
};

type Comment = {
  comment_id: number; // REST API
  // comment_id: string; // GraphQL
  media_id: number; // REST API
  // media_id: string; // GraphQL
  user_id: number;
  comment_text: string;
  created_at: Date;
};

type Like = {
  like_id: number; // REST API
  // like_id: string; // GraphQL
  media_id: number; // REST API
  // media_id: string; // GraphQL
  user_id: number; // REST API
  // user_id: string; // GraphQL
  created_at: Date;
};

type Place = {
  place_id: number;
  place_name: string;
};

type Rating = {
  rating_id: number; // REST API
  // rating_id: string; // GraphQL
  media_id: number; // REST API
  // media_id: string; // GraphQL
  user_id: number; // REST API
  // user_id: string; // GraphQL
  rating_value: number;
  created_at: Date;
};

type Tag = {
  tag_id: number; // REST API
  // tag_id: string; // GraphQL
  tag_name: string;
};

type MediaItemTag = {
  media_id: number; // REST API
  // media_id: string; // GraphQL
  tag_id: number; // REST API
  // tag_id: string; // GraphQL
};

type TagResult = MediaItemTag & Tag;

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};

type MostLikedMedia = Pick<
  MediaItem,
  | 'media_id'
  | 'filename'
  | 'filesize'
  | 'title'
  | 'description'
  | 'created_at'
> &
  Pick<User, 'user_id' | 'username' | 'email' | 'created_at'> & {
    likes_count: bigint;
  };

type UserWithLevel = Omit<User, 'user_level_id'> &
  Pick<UserLevel, 'level_name'>;

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

type TokenContent = Pick<User, 'user_id'> & Pick<UserLevel, 'level_name'>;

type MediaItemWithOwner = MediaItem & {
  owner: User;
  tags?: Tag[];
  likes?: Like[];
  ratings?: Rating[];
  likes_count: number;
  average_rating?: number;
  comments_count: number;
};

type FileInfo = {
  filename: string;
  user_id: number;
};

export type {
  UserLevel,
  User,
  MediaItem,
  Comment,
  Like,
  Place,
  Rating,
  Tag,
  MediaItemTag,
  TagResult,
  UploadResult,
  MostLikedMedia,
  UserWithLevel,
  UserWithNoPassword,
  TokenContent,
  MediaItemWithOwner,
  FileInfo,
};
