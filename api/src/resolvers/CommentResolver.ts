import { Args, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import CreateCommentInput from "../inputs/Comment/CreateCommentInput";
import CommentRepository from "../repositories/CommentRepository";
import Comment from "../models/Comment";


@Resolver()
export class CommentResolver {
    @Query(() => [Comment]) 
    comment() {
        return Comment.find()
    }

    @Mutation(() => Comment)
    async createComment(@Args() { title, content, date }: CreateCommentInput){
        const commentRepository = getCustomRepository(CommentRepository)
        
        const newComment = new Comment();
        newComment.title = title;
        newComment.content = content;
        newComment.date = date;
        console.log();

        await commentRepository.save(newComment);
        return newComment;
    }
}