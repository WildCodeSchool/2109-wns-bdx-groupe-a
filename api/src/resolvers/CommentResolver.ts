import { Args, Mutation, Query, Resolver } from "type-graphql";

import CreateCommentInput from "../inputs/Comment/CreateCommentInput";
import DeleteCommentInput from "../inputs/Comment/DeleteCommentInput";
import UpdateCommentInput from "../inputs/Comment/UpdateCommentInput";
import Comment from "../models/Comment";


@Resolver()
export class CommentResolver {
    @Query(() => [Comment]) 
    getComment() {
        return Comment.find()
    }

    @Mutation(() => Comment)
    async createComment(@Args() { title, content, date }: CreateCommentInput){
        
        const newComment = new Comment();
        newComment.title = title;
        newComment.content = content;
        newComment.date = date;

        await newComment.save();
        return newComment;
    }

    @Mutation(() => Comment)
    async updateComment(@Args() { id, title, content, date} : UpdateCommentInput){
        const commentToUpdate = await Comment.findOneOrFail( { id } )

        if (!commentToUpdate) {
            throw new Error('No comment founded')
        }

        let newData =  {
            title: title ?? commentToUpdate.title,
            content: content ?? commentToUpdate.content,
            date: new Date ?? commentToUpdate.date,
        }

        Object.assign(commentToUpdate, newData)
        await commentToUpdate.save()

        return commentToUpdate
    }

    @Mutation(() => Comment)
    async deleteTask(@Args() { id } : DeleteCommentInput){
        const commentToDelete = await Comment.findOneOrFail({ id })
        if (!commentToDelete) {
            throw new Error('No comment founded')
        }

        await commentToDelete.remove()
        return "Comment `$id` Deleted"
    }
}