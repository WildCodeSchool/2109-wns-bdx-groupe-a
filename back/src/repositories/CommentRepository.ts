import { EntityRepository, Repository } from 'typeorm';
import Comment from '../models/Comment.model.js';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {}

export default CommentRepository;
