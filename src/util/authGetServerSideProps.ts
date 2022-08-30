/*
 * authGetServerSideProps.ts
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */
import { withSSRContext } from "aws-amplify";
import { NextPageContext } from "next";

export default async function authGetServerSideProps(context: NextPageContext) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        username: user.username,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/login?redirect=/profile",
      },
    };
  }
}
