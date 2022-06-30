/* eslint-disable no-await-in-loop */
import { getConnection } from 'typeorm';
import createTestClient from 'supertest'
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';
import User from '../../models/User';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS)

describe('UserResolver', () => {
  let testClient : createTestClient.SuperTest<createTestClient.Test>

    beforeAll(async () => {
      const {expressServer} = await getExpressServer();
      testClient = createTestClient(expressServer)

      if (!process.env.DATABASE_TEST_URL) {
        throw Error('TEST_DATABASE_URL must be set in environment.')
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

  describe('mutation createUser', () => {
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

    it('creates and returns user', async () => {
      const result = await testClient.post("/graphql").send({
        query: CREATE_USER,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      });

      expect(await User.findOneOrFail({ firstName: 'Alfred' })).toHaveProperty(
        'email',
        'Bordeaux@test.fr'
      );

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createUser).toEqual({
        firstName: 'Alfred',
        lastName: 'Test',
        email: 'Bordeaux@test.fr',
        role: 'Manager'
      });
    });
  });
});
