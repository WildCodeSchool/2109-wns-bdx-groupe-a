import { ApolloServer } from 'apollo-server';
import { getConnection } from 'typeorm';
import getApolloServer from '../../apollo-server';
import Comment from '../../models/Comment';
import getDatabaseTestConnection from '../db-test-connection';

describe('CommentResolver', () => {
    let server: ApolloServer;

    beforeAll(async () => {
        server = await getApolloServer();
    });
    beforeEach(() => getDatabaseTestConnection());
    afterEach(() => getConnection().close());
    
    describe('mutation createComment', () => {
        const CREATE_COMMENT = `
        mutation($title: String!, $content: String!, $date: DateTime!) {
            createComment(title: $title, content: $content, date: $date) {
                title
                content
                date
            }
        }
        `;

        it('creates and returns comment', async () => {
            const result = await server.executeOperation({
                query: CREATE_COMMENT,
                variables: {
                    title: 'crud',
                    content: 'I do not understand the crud',
                    date: '2021-11-23T23:18:00.134Z'
                }
            });

            expect(await Comment.findOne({ title: 'crud' })).toHaveProperty(
                'content',
                'I do not understand the crud'
            );

            expect(result.errors).toBeUndefined();
            expect(result.data?.createComment).toEqual({
                title: 'crud',
                content: 'I do not understand the crud',
                date: '2021-11-23T23:18:00.134Z'
            });
        });
    });
});