/* eslint-disable no-await-in-loop */
import { getConnection } from 'typeorm';
import createTestClient from 'supertest';
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';

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

    const CREATE_USER = `
    mutation($firstName: String!, $lastName: String!, $role: String!, $email: String!, $password: String!) {
      createUser(firstName: $firstName, lastName: $lastName, role: $role, email: $email, password: $password) {
        firstName
        lastName
        role
        email
      }
    }
    `;

    const CREATE_PROJECT = `
    mutation ($title: String!, $creatorId: String!, $description: String!, $picture: String!, $startDate: String!, $endDate: String!) {
    createProject(title: $title, creatorId: $creatorId, description: $description, picture: $picture, start_date: $startDate, end_date: $endDate) {
      id
      creatorId
      title
      description
      picture
      start_date
      end_date
    }
  }
  `;

    const UPDATE_PROJECT = `
    mutation ($updateProjectId: String!, $title: String, $description: String, $picture: String, $startDate: String, $endDate: String, $userId: String) {
      updateProject(id: $updateProjectId, title: $title, description: $description, picture: $picture, start_date: $startDate, end_date: $endDate, userId: $userId) {
      title
      description
      picture
      start_date
      end_date
      users {
        email
        firstName
        lastName
      }
    }
  }
  `;

    const DELETE_PROJECT = `
    mutation Mutation($deleteProjectId: String!) {
      deleteProject(id: $deleteProjectId) {
        title
        description
        start_date
        picture
        end_date
      }
    }`;

    const GET_PROJECTS = `
    query Query {
      getProjects {
        id
        description
        title
      }
    }`;

    it('creates and returns project', async () => {
      const result = await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'Projet 1',
          description: 'Projet sur les tests unitaires',
          creatorId: '1',
          picture: 'https://www.google.com',
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createProject).toEqual({
        title: 'Projet 1',
        description: 'Projet sur les tests unitaires',
        end_date: '2020-01-01',
        picture: 'https://www.google.com',
        start_date: '2020-01-01',
        creatorId: '1',
        id: '1',
      });
    });

    it('update a project', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_USER,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      })

      await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'Projet 1',
          description: 'Projet sur les tests unitaires',
          creatorId: '1',
          picture: 'https://www.google.com',
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        }
      });

      const result = await testClient.post('/graphql').send({
        query: UPDATE_PROJECT,
        variables: {
          updateProjectId: '1',
          title: 'Projet 1.0',
          description: 'Update les tests unitaires',
          picture: 'https://www.google.com',
          startDate: '2020-01-01',
          endDate: '2020-01-01',
          userId: '1',
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.updateProject).toEqual({
        title: 'Projet 1.0',
        description: 'Update les tests unitaires',
        end_date: '2020-01-01',
        picture: 'https://www.google.com',
        start_date: '2020-01-01',
        users: [
          {
            email: 'Bordeaux@test.fr',
            firstName: 'Alfred',
            lastName: 'Test',
          },
        ],
      });
    });

    it('delete a project', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'Projet 1',
          description: 'Projet sur les tests unitaires',
          creatorId: '1',
          picture: 'https://www.google.com',
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        }
      });

      const result = await testClient.post('/graphql').send({
        query: DELETE_PROJECT,
        variables: {
          deleteProjectId: '1'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteProject).toEqual({
        title: 'Projet 1',
        description: 'Projet sur les tests unitaires',
        picture: 'https://www.google.com',
          start_date: '2020-01-01',
          end_date: '2020-01-01',
      });
    });

    it('return all projects', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'Projet 1',
          description: 'Projet sur les tests unitaires',
          creatorId: '1',
          picture: 'https://www.google.com',
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        }
      });
      await testClient.post('/graphql').send({
        query: CREATE_PROJECT,
        variables: {
          title: 'Projet 2',
          description: 'Projet 2 sur les tests unitaires',
          creatorId: '1',
          picture: 'https://www.wildcodeschool.com',
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        }
      });

      const result = await testClient.post('/graphql').send({
        query: GET_PROJECTS
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.getProjects).toEqual([
        {
          description: 'Projet sur les tests unitaires',
          id: '1',
          title: 'Projet 1'
        },
        { description: 'Projet 2 sur les tests unitaires', id: '2', title: 'Projet 2' }
      ]);
    });
  });
});
