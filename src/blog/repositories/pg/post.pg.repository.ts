import { EntityRepository } from 'typeorm';
import { Post } from 'src/blog/entities/post.entity';
import { BasePGRepository } from './base.pg.repository';
import { PostRepository } from '../post.repository';

@EntityRepository(Post)
export class PostPGRepository
  extends BasePGRepository<Post>
  implements PostRepository {}
