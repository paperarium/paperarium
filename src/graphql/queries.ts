export const getUser = /* GraphQL */ `
  query getUser($id: ID!) {
    getUser(id: $id) {
      username
      id
      email
      createdAt
      updatedAt
      papercrafts {
        items {
          id
          glb {
            bucket
            region
            key
          }
          pdo {
            bucket
            region
            key
          }
          pdf_lineless {
            bucket
            region
            key
          }
          pdf_lined {
            bucket
            region
            key
          }
        }
        nextToken
      }
    }
  }
`;
