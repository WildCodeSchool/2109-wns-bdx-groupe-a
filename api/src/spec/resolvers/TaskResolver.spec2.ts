/* eslint-disable no-await-in-loop */
import { getConnection } from "typeorm";
import createTestClient from "supertest";
import getDatabaseTestConnection from "../db-test-connection";
import getExpressServer from "../../express-server";

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe("TaskResolver", () => {
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

  const CREATE_PROJECT = `
  mutation CreateProject($title: String!, $userId: String!, $description: String!, $picture: String!, $startDate: DateTime!, $endDate: DateTime!, $userAssignedId: String!) {
    createProject(title: $title, userId: $userId, description: $description, picture: $picture, startDate: $startDate, endDate: $endDate, userAssignedId: $userAssignedId) {
      id
      userId
      title
      description
      picture
      startDate
      endDate
    }
  }
  `;

  const CREATE_TASK = `
  mutation($title: String!, $attachment: String!, $progressState: String!, $description: String!, $projectId: String!) {
    createTask(title: $title, attachment: $attachment, progress_state: $progressState, description: $description, projectId : $projectId) {
      title
      description
      attachment
      progress_state
      projectId
    }
  }
  `;

  const QUERY_TASK_BY_TITLE = `
  query($title: String!) {
    getTaskByTitle(title: $title) {
      id
      title
      description
      attachment
      progress_state
    }
  }
  `;

  const UPDATE_TASK = `
  mutation($updateTaskId: String!, $title: String) {
    updateTask(id: $updateTaskId, title: $title) {
      title
      description
      attachment
      id
      progress_state
    }
  } 
  `;

  const GET_TASK_BY_ID = `
  query Query($taskId: String!) {
    getTaskById(id: $taskId) {
      id
      title
      description
      attachment
      progress_state
    }
  }
  `;

  const DELETE_TASK_BY_ID = `
  mutation Mutation($taskId: String!) {
  deleteTask(id: $taskId) {
    title
    description
    attachment
    progress_state
  }
}
  `;

  describe("mutation createTask", () => {
    it("creates and returns task", async () => {
      const test = await testClient.post("/graphql").send({
        query: CREATE_PROJECT,
        variables: {
          title: "Premier projet",
          userId: "1",
        },
      });

      // console.log(test);

      const result = await testClient.post("/graphql").send({
        query: CREATE_TASK,
        variables: {
          title: "Premiere tache",
          attachment: "",
          progressState: "IN PROGRESS",
          description: "En cours",
          projectId: "1",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.createTask).toEqual({
        title: "Premiere tache",
        attachment: "",
        progress_state: "IN PROGRESS",
        description: "En cours",
        projectId: "1",
      });
    });
  });

  describe("mutation updateTaskt", () => {
    it("update a task", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_TASK,
        variables: {
          title: "Premiere tache update",
          attachment: "",
          progressState: "IN PROGRESS",
          description: "En cours",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: UPDATE_TASK,
        variables: {
          updateTaskId: "1",
          title: "Premiere tache update v2",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.updateTask).toEqual({
        id: "1",
        title: "Premiere tache update v2",
        attachment: "",
        progress_state: "IN PROGRESS",
        description: "En cours",
      });
    });

    it("cannot update a task because id doesnt exist and return error", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_TASK,
        variables: {
          title: "Premiere tache update",
          attachment: "",
          progressState: "IN PROGRESS",
          description: "En cours",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: UPDATE_TASK,
        variables: {
          updateTaskId: "2",
          title: "Premiere tache update v2",
        },
      });

      expect(JSON.parse(result.text).errors).toBeTruthy();
    });
  });
  describe("query getTaskByTitle", () => {
    it("query a task by title", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_TASK,
        variables: {
          title: "Ma super tache",
          attachment: "",
          progressState: "IN PROGRESS",
          description: "En cours",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: QUERY_TASK_BY_TITLE,
        variables: {
          title: "Ma super tache",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.getTaskByTitle).toEqual({
        id: "1",
        title: "Ma super tache",
        attachment: "",
        progress_state: "IN PROGRESS",
        description: "En cours",
      });
    });

    it("should return an error if task doest not exist", async () => {
      const result = await testClient.post("/graphql").send({
        query: QUERY_TASK_BY_TITLE,
        variables: {
          title: "My super task",
        },
      });

      expect(JSON.parse(result.text).errors).toBeTruthy();
    });
  });
  describe("mutation delete task", () => {
    it("delete a task", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_TASK,
        variables: {
          title: "Ma super tache",
          progressState: "IN PROGRESS",
          description: "En cours",
          attachment: "",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: DELETE_TASK_BY_ID,
        variables: {
          taskId: "1",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.deleteTask).toEqual({
        title: "Ma super tache",
        progress_state: "IN PROGRESS",
        description: "En cours",
        attachment: "",
      });
    });
  });

  describe("query getTasks", () => {
    it("should get task by project id", async () => {
      // TODO
    });
    it("should get task by id", async () => {
      await testClient.post("/graphql").send({
        query: CREATE_TASK,
        variables: {
          title: "Ma super tache",
          attachment: "",
          progressState: "IN PROGRESS",
          description: "En cours",
        },
      });

      const result = await testClient.post("/graphql").send({
        query: GET_TASK_BY_ID,
        variables: {
          taskId: "1",
        },
      });

      expect(JSON.parse(result.text).errors).toBeUndefined();
      expect(JSON.parse(result.text).data?.getTaskById).toEqual({
        id: "1",
        title: "Ma super tache",
        attachment: "",
        progress_state: "IN PROGRESS",
        description: "En cours",
      });
    });
  });
});
