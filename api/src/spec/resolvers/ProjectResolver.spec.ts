import { getConnection } from 'typeorm';
import createTestClient from 'supertest'
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';
import Project from '../../models/Project';

describe('CommentResolver', () => {
  let testClient : createTestClient.SuperTest<createTestClient.Test>

  beforeAll(async () => {
    const {expressServer} = await getExpressServer();
    testClient = createTestClient(expressServer)
  });
  beforeEach(() => getDatabaseTestConnection());
  afterEach(() => getConnection().close());

  describe('mutation createProject', () => {
    const CREATE_PROJECT = `
        mutation($title: String!, $description: String!, $picture: String!, $startDate: DateTime!, $endDate: DateTime!) {
            createProject(title: $title, description: $description, picture: $picture, startDate: $startDate, endDate: $endDate) {
                title
                description
                picture
                startDate
                endDate
            }
        }
        `;

    it('creates and returns project', async () => {
      const result = await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: 'crud',
          description: 'I do not understand the crud',
          picture: 'data.png',
          startDate: '2021-11-23T23:18:00.134Z',
          endDate: '2022-11-23T23:18:00.134Z'
        }
      });

      expect(await Project.findOneOrFail({ title: 'crud' })).toHaveProperty(
        'description',
        'I do not understand the crud'
      );

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createProject).toEqual({
        title: 'crud',
        description: 'I do not understand the crud',
        picture: 'data.png',
        startDate: '2021-11-23T23:18:00.134Z',
        endDate: '2022-11-23T23:18:00.134Z'
      });
    });
  });
});
