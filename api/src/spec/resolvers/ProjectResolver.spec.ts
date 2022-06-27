/* eslint-disable no-await-in-loop */
import { getConnection } from 'typeorm';
import createTestClient from 'supertest';
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';
import Project from '../../models/Project';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe('ProjectResolver', () => {
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
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(`SET FOREIGN_KEY_CHECKS=0;`);
      await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
      await repository.query(`SET FOREIGN_KEY_CHECKS=1;`);
    }
  });
  afterAll(() => getConnection().close());

  describe('mutation createProject', () => {
    const CREATE_PROJECT = `
        mutation($title: String!, $description: String!, $picture: String!, $startDate: DateTime!, $endDate: DateTime!) {
            createProject(title: $title, description: $description, picture: $picture, start_date: $startDate, end_date: $endDate) {
                title
                description
                picture
                start_date
                end_date
            }
        }
        `;

    const UPDATE_PROJECT = ` 
    mutation Mutation($updateProjectId: String!, $title: String, $description: String, $picture: String, $startDate: DateTime, $endDate: DateTime) {
      updateProject(id: $updateProjectId, title: $title, description: $description, picture: $picture, start_date: $startDate, end_date: $endDate) {
        id
    title
    description
    picture
    start_date
    end_date
      }
    }
    `;

    const DELETE_PROJECT = `
    mutation Mutation($deleteProjectId: String!) {
      deleteProject(id: $deleteProjectId) {
        id
        title
        description
        start_date
        picture
        end_date
      }
    }`;

    const GET_PROJECTS = `mutation Mutation($deleteProjectId: String!) {
      deleteProject(id: $deleteProjectId) {
        id
        title
        description
        start_date
        picture
        end_date
      }
    }`;

    it('creates and returns project', async () => {
      const result = await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'crud',
          description: 'I do not understand the crud',
          picture: 'data.png',
          startDate: '2021-11-23T23:18:00.134Z',
          endDate: '2022-11-23T23:18:00.134Z'
        }
      });


      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createProject).toEqual({
        title: 'crud',
        description: 'I do not understand the crud',
        picture: 'data.png',
        start_date: '2021-11-23T23:18:00.134Z',
        end_date: '2022-11-23T23:18:00.134Z'
      });
    });

    it('update a project', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'Projet 1',
          description: 'Un projet sur les tests unitaires',
        }
      });

      const result = await testClient.post('/graphql').send({
        query: UPDATE_PROJECT,
        variables: {
          updateCommentId: '1',
          title: 'Projet 1.0',
          description: 'Update sur n projet sur les tests unitaires',
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.updateProject).toEqual({
        id: '1',
        title: 'Projet 1.0',
        description: 'Update sur n projet sur les tests unitaires'
      });
    });
  });
});
