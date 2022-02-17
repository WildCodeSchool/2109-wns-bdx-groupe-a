import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../src/apollo-server'
import getDatabaseConnection from './db-connection'
import User from '../src/models/User'

describe("WilderResolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await getApolloServer();
  });
  beforeEach(() => getDatabaseConnection(":memory:"));
  afterEach(() => getConnection().close());
  

  describe("mutation createWilder", () => {
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

    it("creates and returns wilder", async () => {
      const result = await server.executeOperation({
        query: CREATE_USER,
        variables: {
          name: "Alfred",
          email: "Bordeaux@test.fr",
          role: "Manager",
          password: "test33"
        },
      });

      expect(await User.findOne({ name: "Alfred" })).toHaveProperty(
        "email",
        "Bordeaux@test.fr",
      );

      expect(result.errors).toBeUndefined();
      expect(result.data?.createUser).toEqual({
          name: "Alfred",
          email: "Bordeaux@test.fr",
          role: "Manager",
          password: "test33"
      });
    });
  });
});