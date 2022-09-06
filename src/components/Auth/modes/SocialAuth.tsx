/*
 * SocialAuth.tsx
 * author: evan kirkiles
 * created on Tue Sep 06 2022
 * 2022 the nobot space,
 */
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Provider, SupabaseClient } from "@supabase/supabase-js";
import { Button, Divider, Space, Typography } from "@supabase/ui";
import { useState } from "react";
import { RedirectTo, VIEWS, ViewType } from "../Auth";
import * as SocialIcons from "../SocialIcons";
import s from "../Auth.module.scss";

const buttonStyles: any = {
  azure: {
    backgroundColor: "#008AD7",
    color: "white",
  },
  bitbucket: {
    backgroundColor: "#205081",
    color: "white",
  },
  facebook: {
    backgroundColor: "#4267B2",
    color: "white",
  },
  github: {
    backgroundColor: "#333",
    color: "white",
  },
  gitlab: {
    backgroundColor: "#FC6D27",
  },
  google: {
    backgroundColor: "#ce4430",
    color: "white",
  },
  twitter: {
    backgroundColor: "#1DA1F2",
    color: "white",
  },
  apple: {
    backgroundColor: "#000",
    color: "white",
  },
  discord: {
    backgroundColor: "#404fec",
    color: "white",
  },
  twitch: {
    backgroundColor: "#9146ff",
    color: "white",
  },
};

type SocialAuthProps = {
  supabaseClient: SupabaseClient;
  className?: string;
  children?: React.ReactNode;
  providers?: Provider[];
  redirectTo?: RedirectTo;
  view?: ViewType;
  magicLink?: boolean;
  verticalSocialLayout?: boolean;
};

export function SocialAuth({
  providers,
  redirectTo,
  view,
  verticalSocialLayout,
}: SocialAuthProps) {
  // statefuls
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn(
      { provider },
      { redirectTo }
    );
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <Space size={8} direction={"vertical"}>
      {providers && providers.length > 0 && (
        <>
          <Space size={4} direction={"vertical"}>
            <Typography.Text type="secondary" className={s.sbui_auth_label}>
              Sign {view === VIEWS.SIGN_UP ? "up" : "in"} with
            </Typography.Text>
            <Space size={2} direction={"vertical"}>
              {providers.map((provider) => {
                // @ts-ignore
                const AuthIcon = SocialIcons[provider];
                return (
                  <div
                    key={provider}
                    style={!verticalSocialLayout ? { flexGrow: 1 } : {}}
                  >
                    <Button
                      block
                      type="default"
                      shadow
                      // style={buttonStyles[provider]}
                      icon={AuthIcon ? <AuthIcon /> : ""}
                      loading={loading}
                      onClick={() => handleProviderSignIn(provider)}
                      className={"flex items-center"}
                    >
                      Sign {view === VIEWS.SIGN_UP ? "up" : "in"} with{" "}
                      {provider}
                    </Button>
                  </div>
                );
              })}
            </Space>
          </Space>
          <Divider>or continue with</Divider>
        </>
      )}
    </Space>
  );
}
