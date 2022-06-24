import { getConnection } from 'typeorm';
import createTestClient from 'supertest'
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';
import Comment from '../../models/Comment';

describe('CommentResolver', () => {
  let testClient : createTestClient.SuperTest<createTestClient.Test>

    beforeAll(async () => {
      const {expressServer} = await getExpressServer();
      testClient = createTestClient(expressServer)
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
            const result = await testClient.post('/graphql').send({
                query: CREATE_COMMENT,
                variables: {
                    title: 'crud',
                    content: 'I do not understand the crud',
                    date: '2021-11-23T23:18:00.134Z'
                }
            });

            expect(await Comment.findOneOrFail({ title: 'crud' })).toHaveProperty(
                'content',
                'I do not understand the crud'
            );

            expect(JSON.parse(result.text).errors).toBeUndefined();
            expect(JSON.parse(result.text).data?.createComment).toEqual({
                title: 'crud',
                content: 'I do not understand the crud',
                date: '2021-11-23T23:18:00.134Z'
            });
        });
    });
});