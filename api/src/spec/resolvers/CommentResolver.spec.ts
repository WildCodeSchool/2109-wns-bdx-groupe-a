/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { getConnection } from 'typeorm';
import createTestClient from 'supertest';
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';
import Comment from '../../models/Comment';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe('CommentResolver', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;

  beforeAll(async () => {
    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);

    if (!process.env.DATABASE_TEST_URL) {
      throw Error('TEST_DATABASE_URL must be set in environment.');
    }

    return getDatabaseTestConnection(process.env.DATABASE_TEST_URL);
  });
  beforeEach(async () => {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(`SET FOREIGN_KEY_CHECKS=0;`);
      await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
      await repository.query(`SET FOREIGN_KEY_CHECKS=1;`);
    }
  });
  afterAll(() => getConnection().close());

  describe('CommentResolver', () => {
    const CREATE_COMMENT = `
        mutation($title: String!, $content: String!, $date: DateTime!) {
            createComment(title: $title, content: $content, date: $date) {
                title
                content
                date
            }
        }
        `;

    const UPDATE_COMMENT = `
        mutation Mutation($updateCommentId: String!, $title: String!, $content: String!, $date: DateTime!) {
          updateComment(id: $updateCommentId, title: $title, content: $content, date: $date) {
            id
            title
            content
            date
          }
        }`;

    const DELETE_COMMENT = `
        mutation Mutation($deleteCommentId: String!) {
          deleteComment(id: $deleteCommentId) {
            title
            content
          }
        }`;

    const GET_COMMENTS = `
        query Query {
          getComment {
            id
            title
            content
          }
        }
        `;

    it('return all comments', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_COMMENT,
        variables: {
          title: 'Commentaire 1',
          content: 'Mon commentaire 1',
          date: '2019'
        }
      });

      await testClient.post('/graphql').send({
        query: CREATE_COMMENT,
        variables: {
          title: 'Commentaire 2',
          content: 'Mon commentaire 2',
          date: '2020'
        }
      });

      await testClient.post('/graphql').send({
        query: CREATE_COMMENT,
        variables: {
          title: 'Commentaire 3',
          content: 'Mon commentaire 3',
          date: '2019'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: GET_COMMENTS
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.getComment).toEqual([
        { content: 'Mon commentaire 1', id: '1', title: 'Commentaire 1' },
        { content: 'Mon commentaire 2', id: '2', title: 'Commentaire 2' },
        { content: 'Mon commentaire 3', id: '3', title: 'Commentaire 3' }
      ]);
    });

    it('creates and returns comment', async () => {
      const result = await testClient.post('/graphql').send({
        query: CREATE_COMMENT,
        variables: {
          title: 'crud',
          content: 'I do not understand the crud',
          date: '2021-11-23T23:18:00.134Z'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createComment).toEqual({
        title: 'crud',
        content: 'I do not understand the crud',
        date: '2021-11-23T23:18:00.134Z'
      });
    });

    it('update a comment', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_COMMENT,
        variables: {
          title: 'Mon commentaire',
          content: 'Création du test',
          date: '2021-11-23T23:18:00.134Z'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: UPDATE_COMMENT,
        variables: {
          updateCommentId: '1',
          title: 'Mon commentaire',
          content: 'Modification du test',
          date: '2021-11-23T23:18:00.134Z'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.updateComment).toEqual({
        id: '1',
        title: 'Mon commentaire',
        content: 'Modification du test',
        date: '2021-11-23T23:18:00.134Z'
      });
    });
    
    it('delete a comment', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_COMMENT,
        variables: {
          title: 'Mon commentaire à supprimer',
          content: 'Commentaire inutile',
          date: '2022'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: DELETE_COMMENT,
        variables: {
          deleteCommentId: '1'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteComment).toEqual({
        title: 'Mon commentaire à supprimer',
        content: 'Commentaire inutile'
      });
    });
  });
});
