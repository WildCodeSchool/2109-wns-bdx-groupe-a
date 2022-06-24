// import { ApolloServer } from 'apollo-server';
// import { getConnection } from 'typeorm';
// import getApolloServer from '../../apollo-server';
// import Project from '../../models/Project';
// import getDatabaseTestConnection from '../db-test-connection';
describe('Logger', () => {
  test.todo('please pass');
});
// describe('CommentResolver', () => {
//   let server: ApolloServer;

//   beforeAll(async () => {
//     server = await getApolloServer();
//   });
//   beforeEach(() => getDatabaseTestConnection());
//   afterEach(() => getConnection().close());

//   describe('mutation createProject', () => {
//     const CREATE_PROJECT = `
//         mutation($title: String!, $description: String!, $picture: String!, $start_date: DateTime!, $end_date: DateTime!) {
//             createProject(title: $title, description: $description, picture: $picture, start_date: $start_date, end_date: $end_date) {
//                 title
//                 description
//                 picture
//                 start_date
//                 end_date
//             }
//         }
//         `;

//     it('creates and returns project', async () => {
//       const result = await server.executeOperation({
//         query: CREATE_PROJECT,
//         variables: {
//           title: 'crud',
//           description: 'I do not understand the crud',
//           picture: 'data.png',
//           start_date: '2021-11-23T23:18:00.134Z',
//           end_date: '2022-11-23T23:18:00.134Z'
//         }
//       });

//       expect(await Project.findOne({ title: 'crud' })).toHaveProperty(
//         'description',
//         'I do not understand the crud'
//       );

//       expect(result.errors).toBeUndefined();
//       expect(result.data?.createProject).toEqual({
//         title: 'crud',
//         description: 'I do not understand the crud',
//         picture: 'data.png',
//         start_date: '2021-11-23T23:18:00.134Z',
//         end_date: '2022-11-23T23:18:00.134Z'
//       });
//     });
//   });
// });
