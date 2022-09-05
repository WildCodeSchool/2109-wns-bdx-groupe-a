/* eslint-disable no-await-in-loop */
import { getConnection } from 'typeorm';
import createTestClient from 'supertest';
import getDatabaseTestConnection from '../db-test-connection';
import getExpressServer from '../../express-server';
import User from '../../models/User';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe('UserResolver', () => {
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

  const UPDATE_USER = `
  mutation Mutation($updateUserId: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!, $role: String!) {
    updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role) {
      id
      firstName
      lastName
      email
      role
    }
  }`;

  const DELETE_USER = `
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      firstName
      lastName
      email
      role
    }
  }`;

  const GET_USERS = `
    query Query {
      getUsers {
        id
        firstName
        lastName
        email
        role
      }
    }`;

  const SIGN_UP = `
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      firstName
      lastName
      email
      role
    }
  }`;

  const SIGN_IN = `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstName
      lastName
      role
      email
    }
  }`;

  const GET_MY_PROFILE = `
  query GetMyProfile {
    myProfile {
      id
      email
      firstName
      lastName
    }
  }
`;

  const DELETE_SESSION = `
  mutation deleteSession {
    deleteSession
  }
`;

  describe('UserResolver', () => {
    it('creates and returns user', async () => {
      const result = await testClient.post('/graphql').send({
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

    it('returns all users', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_USER,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      });
      await testClient.post('/graphql').send({
        query: CREATE_USER,
        variables: {
          firstName: 'Tintin',
          lastName: 'Test',
          email: 'Autibet@test.fr',
          role: 'Admin',
          password: 'test33'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: GET_USERS
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.getUsers).toEqual([
        {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          id: '1'
        },
        {
          firstName: 'Tintin',
          lastName: 'Test',
          email: 'Autibet@test.fr',
          role: 'Admin',
          id: '2'
        }
      ]);
    });

    it('update a user', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_USER,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: UPDATE_USER,
        variables: {
          updateUserId: '1',
          firstName: 'Bruce',
          lastName: 'Wayne',
          email: 'Gotham@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.updateUser).toEqual({
        id: '1',
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'Gotham@test.fr',
        role: 'Manager'
      });
    });

    it('delete a user', async () => {
      await testClient.post('/graphql').send({
        query: CREATE_USER,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          role: 'Manager',
          password: 'test33'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: DELETE_USER,
        variables: {
          deleteUserId: '1'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteUser).toEqual({
        firstName: 'Alfred',
        lastName: 'Test',
        email: 'Bordeaux@test.fr',
        role: 'Manager'
      });
    });

    it('user sign up with visitor role', async () => {
      const result = await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.signUp).toEqual({
        id: '1',
        firstName: 'Alfred',
        lastName: 'Test',
        email: 'Bordeaux@test.fr',
        role: 'visitor'
      });
    });

    it('should throw an error if password/email incorrect when sign in', async () => {
      const result = await testClient.post('/graphql').send({
        query: SIGN_IN,
        variables: {
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      expect(JSON.parse(result.text).errors).toBeTruthy();
      expect(JSON.parse(result.text).errors[0].message).toEqual(
        'Could not sign in with provided email address and password.'
      );
    });

    it('should throw an error if email already exist when sign up', async () => {
      await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });
      const result = await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred 2',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'blablalblB1234567!!'
        }
      });

      expect(JSON.parse(result.text).errors).toBeTruthy();
      expect(JSON.parse(result.text).errors[0].message).toEqual(
        'Could not sign up with provided email address.'
      );
    });

    it('should throw an error if password is incorrect', async () => {
      await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });
      const result = await testClient.post('/graphql').send({
        query: SIGN_IN,
        variables: {
          email: 'Bordeaux@test.fr',
          password: 'blablalblB1234567!!'
        }
      });

      expect(JSON.parse(result.text).errors).toBeTruthy();
      expect(JSON.parse(result.text).errors[0].message).toEqual(
        'Could not sign in with provided email address and password.'
      );
    });

    it('should sign in and return visitor role', async () => {
      await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      const result = await testClient.post('/graphql').send({
        query: SIGN_IN,
        variables: {
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.signIn).toEqual({
        id: '1',
        firstName: 'Alfred',
        lastName: 'Test',
        email: 'Bordeaux@test.fr',
        role: 'visitor'
      });
    });

    it('should get the profile', async () => {
      await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      const userSignIn = await testClient.post('/graphql').send({
        query: SIGN_IN,
        variables: {
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });
      // on force la main à super test pour le set le cookie
      const cookie = userSignIn.headers['set-cookie'][0];

      const result = await testClient
        .post('/graphql')
        .set('Cookie', cookie)
        .send({
          query: GET_MY_PROFILE
        });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.myProfile).toEqual({
        id: '1',
        firstName: 'Alfred',
        lastName: 'Test',
        email: 'Bordeaux@test.fr'
      });
    });

    it('should delete the session', async () => {
      await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      const userSignIn = await testClient.post('/graphql').send({
        query: SIGN_IN,
        variables: {
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });
      // on force la main à super test pour le set le cookie
      const cookie = userSignIn.headers['set-cookie'][0];

      const result = await testClient
        .post('/graphql')
        .set('Cookie', cookie)
        .send({
          query: DELETE_SESSION
        });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteSession).toBeTruthy();
    });

    it('should not delete the session', async () => {
      await testClient.post('/graphql').send({
        query: SIGN_UP,
        variables: {
          firstName: 'Alfred',
          lastName: 'Test',
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });

      await testClient.post('/graphql').send({
        query: SIGN_IN,
        variables: {
          email: 'Bordeaux@test.fr',
          password: 'Test1234567!!'
        }
      });
      // on force la main à super test pour le set le cookie

      const result = await testClient.post('/graphql').send({
        query: DELETE_SESSION
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteSession).toBeFalsy();
    });
  });
});