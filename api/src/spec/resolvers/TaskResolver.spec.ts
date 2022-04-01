// import { ApolloServer } from 'apollo-server';
// import { getConnection } from 'typeorm';
// import getApolloServer from '../../apollo-server';
// import Task from '../../models/Task';
// import getDatabaseTestConnection from '../db-test-connection';
describe('Logger', () => {
  test.todo('please pass');
});
// describe('UserResolver', () => {
//   let server: ApolloServer;

//   beforeAll(async () => {
//     server = await getApolloServer();
//   });

//   beforeEach(() => getDatabaseTestConnection());
//   afterEach(() => getConnection().close());

//   describe('mutation createTask', () => {
//     // TODO RAJOUTER ID (il faut drop la table avant chaque test)
//     const CREATE_TASK = `
//     mutation($title: String!, $attachment: String!, $progressState: String!, $description: String!) {
//       createTask(title: $title, attachment: $attachment, progress_state: $progressState, description: $description) {
//         title
//         description
//         attachment
//         progress_state
//       }
//     }
//     `;

//     it('creates and returns task', async () => {
//       const result = await server.executeOperation({
//         query: CREATE_TASK,
//         variables: {
//           title: 'Premiere tache',
//           attachment: '',
//           progressState: 'IN PROGRESS',
//           description: 'En cours'
//         }
//       });

//       expect(result.errors).toBeUndefined();
//       expect(result.data?.createTask).toEqual({
//         title: 'Premiere tache',
//         attachment: '',
//         progress_state: 'IN PROGRESS',
//         description: 'En cours'
//       });
//     });
//   });

//   describe('mutation updateTaskt', () => {
//     // TODO RAJOUTER ID (il faut drop la table avant chaque test)
//     const UPDATE_TASK = `
//     mutation($updateTaskId: String!, $title: String) {
//       updateTask(id: $updateTaskId, title: $title) {
//         title
//         description
//         attachment
//         id
//         progress_state
//       }
//     } 
//     `;

//     it('update a task', async () => {
//       const result = await server.executeOperation({
//         query: UPDATE_TASK,
//         variables: {
//           updateTaskId: '1',
//           title: 'Premiere tache update'
//         }
//       });

//       expect(result.errors).toBeUndefined();
//       expect(result.data?.updateTask).toEqual({
//         id: '1',
//         title: 'Premiere tache update',
//         attachment: '',
//         progress_state: 'IN PROGRESS',
//         description: 'En cours'
//       });
//     });
//   });
//   describe('query getTaskByTitle', () => {
//     const QUERY_TASK_BY_TITLE = `
//     query($title: String!) {
//       getTaskByTitle(title: $title) {
//         id
//         title
//         description
//         attachment
//         progress_state
//       }
//     }
    
//     `;

//     it('query a task by title', async () => {
//       const result = await server.executeOperation({
//         query: QUERY_TASK_BY_TITLE,
//         variables: {
//           title: 'Premiere tache update'
//         }
//       });

//       expect(result.errors).toBeUndefined();
//       expect(result.data?.getTaskByTitle).toEqual({
//         id: '1',
//         title: 'Premiere tache update',
//         attachment: '',
//         progress_state: 'IN PROGRESS',
//         description: 'En cours'
//       });
//     });

//     it('should return an error if task doest not exist', async () => {
//       const result = await server.executeOperation({
//         query: QUERY_TASK_BY_TITLE,
//         variables: {
//           title: 'My super task'
//         }
//       });

//       expect(result.errors).toBeTruthy();
//     });
//   });
// });
