import { Resolver, Query, Mutation, Args } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import Comment from '../models/Comment.model.js';
import CommentRepository from '../repositories/CommentRepository.js';
import DeleteCommentInput from '../types/Comment/DeleteCommentInput.js';
import PostCommentInput from '../types/Comment/PostCommentInput.js';
import UpdateCommentInput from '../types/Comment/UpdateCommentInput.js';

@Resolver(Comment)
class CommentResolver {
  // GET all user

  @Query(() => [Comment])
  async Comment() {
    const commentRepository = getCustomRepository(CommentRepository);
    const comments = await commentRepository.find();

    return comments;
  }

  @Mutation(() => Comment)
  async AddComment(@Args() { title, content, date }: PostCommentInput) {
    const commentRepository = getCustomRepository(CommentRepository);

    const comment = new Comment();
    comment.title = title;
    comment.content = content;
    comment.date = date;

    await commentRepository.save(comment);
    return comment;
  }

  @Mutation(() => Comment)
  async UpdateComment(
    @Args() { id, title, content, date }: UpdateCommentInput
  ) {
    const commentRepository = getCustomRepository(CommentRepository);
    const comment = await commentRepository.findOneOrFail({ id });
    // on récupére l'utilisateur qui correspond a l'id qui est passé au niveau de la fonction

    await commentRepository.update(comment, {
      title: title ?? comment.title,
      content: content ?? comment.content,
      date: date ?? comment.date,
    });
    // MAJ avec les nouvelles données passées en parametres de la fonction

    const commentUpdate = await commentRepository.findOne({ id });
    // on recup l'utilisateur avec les données mise a jour

    return commentUpdate;
  }

  @Mutation(() => Comment)
  async DeleteComment(@Args() { id }: DeleteCommentInput) {
    const commentRepository = getCustomRepository(CommentRepository);
    const comment = await commentRepository.findOneOrFail({ id });

    await commentRepository.remove(comment);

    return comment;
  }
}

export default CommentResolver;
