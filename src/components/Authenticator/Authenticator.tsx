/*
 * AuthCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React from "react";
import {
  Authenticator,
  useTheme,
  Text,
  Heading,
} from "@aws-amplify/ui-react";

const components = {

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <>
          <Heading
            padding={`${tokens.space.xl} ${tokens.space.xl} 0 ${tokens.space.xl}`}
            level={4}
          >
            Sign in to your account
          </Heading>
          <Text
            opacity={0.8}
            padding={`10px ${tokens.space.xl} 0 ${tokens.space.xl}`}
          >
            welcome back! did you miss us? ʕ❍‿❍ʔ
          </Text>
        </>
      );
    },
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
          <Text
            opacity={0.8}
            padding={`10px ${tokens.space.xl} 0 ${tokens.space.xl}`}
          >
            an account allows you to vote on papercrafts, be a testbuilder,
            comment, submit your own designs for display, and much more. we
            would be overjoyed to have you! ʕ❍‿❍ʔ
          </Text>
        </>
      );
    },
  },
};

const Authentication: React.FC<{ redirect?: string, children?: React.ReactNode }> = function AuthCard({
  children
}) {
  return (
    <Authenticator
      socialProviders={["apple", "facebook", "google"]}
      components={components}
    >
      {children}
    </Authenticator>
  );
};

export default Authentication;
