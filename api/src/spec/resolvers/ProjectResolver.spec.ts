/* eslint-disable no-await-in-loop */
import { getConnection } from "typeorm";
import createTestClient from "supertest";
import getDatabaseTestConnection from "../db-test-connection";
import getExpressServer from "../../express-server";

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe("ProjectResolver", () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;

  beforeAll(async () => {
    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);

    if (!process.env.DATABASE_TEST_URL) {
      throw Error("TEST_DATABASE_URL must be set in environment.");
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

  describe("mutation createProject", () => {
    const CREATE_PROJECT = `
        mutation($title: String!, $description: String, $picture: String, $startDate: DateTime, $endDate: DateTime, $userId: String!) {
            createProject(title: $title, description: $description, picture: $picture, startDate: $startDate, endDate: $endDate, userId: $userId) {
                title
                description
                picture
                startDate
                endDate
            }
        }
        `;

    const UPDATE_PROJECT = ` 
    mutation Mutation($updateProjectId: String!, $title: String, $description: String, $picture: String, $startDate: DateTime, $endDate: DateTime) {
      updateProject(id: $updateProjectId, title: $title, description: $description, picture: $picture, startDate: $startDate, endDate: $endDate) {
        id
    title
    description
    picture
    startDate
    endDate
      }
    }
    `;

    const DELETE_PROJECT = `
    mutation Mutation($deleteProjectId: String!) {
      deleteProject(id: $deleteProjectId) {
        title
        description
        startDate
        picture
        endDate
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

    const ADD_USER_TO_PROJECT = `
    mutation Mutation($userId: String!, $projectId: String!){
      addUserToProject(userId: $userId, projectId: $projectId) {
        userId, 
        projectId, 
        title
      }
    }
    `;

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

    it("creates and returns project", async () => {
      const result = await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Projet 1",
          description: "Projet sur les tests unitaires",
          userId: "1",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createProject).toEqual({
        title: "Projet 1",
        description: "Projet sur les tests unitaires",
        endDate: null,
        picture: null,
        startDate: null,
      });
    });

    it("update a project", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Projet 1",
          description: "Un projet sur les tests unitaires",
          userId: "1",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: UPDATE_PROJECT,
        variables: {
          updateProjectId: "1",
          title: "Projet 1.0",
          description: "Update les tests unitaires",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.updateProject).toEqual({
        id: "1",
        title: "Projet 1.0",
        description: "Update les tests unitaires",
        endDate: null,
        picture: null,
        startDate: null,
      });
    });

    it("delete a project", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Projet 1",
          description: "Projet sur les tests unitaires",
          userId: "1",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: DELETE_PROJECT,
        variables: {
          deleteProjectId: "1",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteProject).toEqual({
        title: "Projet 1",
        description: "Projet sur les tests unitaires",
        endDate: null,
        picture: null,
        startDate: null,
      });
    });

    it("return all projects", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Projet 1",
          description: "Projet sur les tests unitaires",
          userId: "1",
        },
      });
      await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Projet 2",
          description: "Projet trello",
          userId: "1",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: GET_PROJECTS,
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.getProjects).toEqual([
        {
          description: "Projet sur les tests unitaires",
          id: "1",
          title: "Projet 1",
        },
        { description: "Projet trello", id: "2", title: "Projet 2" },
      ]);
    });

    it.only("add user to project", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Projet 2",
          description: "Projet trello",
          userId: "1",
        },
      });

      await testClient.post("/graphql").send({
        query: SIGN_UP,
        variables: {
          firstName: "Alfred",
          lastName: "Test",
          email: "Bordeaux@test.fr",
          password: "Test1234567!!",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: ADD_USER_TO_PROJECT,
        variables: {
          userId: "1",
          projectId: "1",
        },
      });

      expect(JSON.parse(result.text).data?.addUserToProject).toEqual({
        title: "test",
      });
    });
  });
});
