/*
 * Auth.tsx
 * author: evan kirkiles
 * created on Tue Sep 06 2022
 * 2022 the nobot space,
 */

import { Provider, SupabaseClient } from "@supabase/supabase-js";
import { Input, Space } from "@supabase/ui";
import { useEffect, useState } from "react";
import s from "./Auth.module.scss";
import { EmailAuth } from "./modes/EmailAuth";
import { ForgottenPassword } from "./modes/ForgottenPassword";
import { MagicLink } from "./modes/MagicLink";
import { SocialAuth } from "./modes/SocialAuth";
import { UpdatePassword } from "./modes/UpdatePassword";

/* -------------------------------------------------------------------------- */
/*                                   TYPINGS                                  */
/* -------------------------------------------------------------------------- */

export const VIEWS: ViewsMap = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

interface ViewsMap {
  [key: string]: ViewType;
}

export type ViewType =
  | "sign_in"
  | "sign_up"
  | "forgotten_password"
  | "magic_link"
  | "update_password";

export type RedirectTo = undefined | string;

type AuthProps = {
  supabaseClient: SupabaseClient;
  className?: string;
  children?: React.ReactNode;
  providers?: Provider[];
  redirectTo?: RedirectTo;
  view?: ViewType;
  magicLink?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const Auth: React.FC<AuthProps> = function Auth({
  supabaseClient,
  className,
  providers,
  redirectTo,
  magicLink = false,
  view = 'sign_in',
}) {
  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");

  const Container = (props: any) => {
    return (
      <div className={[s['sbui-auth'], className].join(' ')}>
        <Space size={8} direction={"vertical"}>
          <SocialAuth
            supabaseClient={supabaseClient}
            verticalSocialLayout={true}
            providers={providers}
            redirectTo={redirectTo}
            magicLink={magicLink}
            view={authView}
          />
          {props.children}
        </Space>
      </div>
    );
  };

  useEffect(() => {
    // handle view override
    setAuthView(view);
  }, [view]);

  switch (authView) {
    case VIEWS.SIGN_IN:
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            id={authView === VIEWS.SIGN_UP ? "auth-sign-up" : "auth-sign-in"}
            supabaseClient={supabaseClient}
            authView={authView}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
          />
        </Container>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <ForgottenPassword
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
          />
        </Container>
      );
    case VIEWS.MAGIC_LINK:
      return (
        <Container>
          <MagicLink
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
          />
        </Container>
      );
    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <UpdatePassword supabaseClient={supabaseClient} />
        </Container>
      )
    default:
      return null;
  }
};

export default Auth;
