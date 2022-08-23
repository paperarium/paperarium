/*
 * AuthCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React from "react";
import {
  Authenticator,
  View,
  useTheme,
  Image,
  Text,
  Heading,
  useAuthenticator,
  Button,
} from "@aws-amplify/ui-react";

const components = {
  // Header() {
  //   const { tokens } = useTheme();

  //   return (
  //     <View textAlign="center" padding={tokens.space.large}>
  //       <Image
  //         alt="Amplify logo"
  //         src="https://docs.amplify.aws/assets/logo-dark.svg"
  //       />
  //     </View>
  //   );
  // },

  // Footer() {
  //   const { tokens } = useTheme();

  //   return (
  //     <View textAlign="center" padding={tokens.space.large}>
  //       <Text color={tokens.colors.neutral[80]}>
  //         &copy; All Rights Reserved
  //       </Text>
  //     </View>
  //   );
  // },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={4}
        >
          Sign in to your account
        </Heading>
      );
    }
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <>
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={4}
          >
            Create a new account
          </Heading>
          <Text opacity={0.8} padding={`10px ${tokens.space.xl} 0 ${tokens.space.xl}`}>
            an account allows you to vote on papercrafts, be a testbuilder,
            comment, submit your own designs for display, and much more. we would
            be overjoyed to have you! ʕ❍‿❍ʔ
            </Text>
        </>
      );
    },
  },
};

const AuthCard: React.FC<{ redirect?: string }> = function AuthCard({
  redirect,
}) {
  return <Authenticator socialProviders={['apple', 'facebook', 'google']} components={components}/>;
};

export default AuthCard;
