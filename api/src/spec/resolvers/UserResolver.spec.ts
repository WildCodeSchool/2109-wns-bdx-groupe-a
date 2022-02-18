import { ApolloServer } from 'apollo-server';
import { getConnection } from 'typeorm';
import getApolloServer from '../../apollo-server';
import User from '../../models/User';
import getDatabaseTestConnection from '../db-test-connection';

describe('UserResolver', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await getApolloServer();
  });
  beforeEach(() => getDatabaseTestConnection());
  afterEach(() => getConnection().close());

  describe('mutation createUser', () => {
    const CREATE_USER = `
    mutation($name: String!, $role: String!, $email: String!, $password: String!) {
      createUser(name: $name, role: $role, email: $email, password: $password) {
        name
        role
        email
        password
      }
    }
    `;

    it('creates and returns user', async () => {
      const result = await server.executeOperation({
        query: CREATE_USER,
        variables: {
          name: 'Alfred',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      });

      expect(await User.findOne({ name: 'Alfred' })).toHaveProperty(
        'email',
        'Bordeaux@test.fr'
      );

      expect(result.errors).toBeUndefined();
      expect(result.data?.createUser).toEqual({
        name: 'Alfred',
        email: 'Bordeaux@test.fr',
        role: 'Manager',
        password: 'test33'
      });
    });
  });
});
