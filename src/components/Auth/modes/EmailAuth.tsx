/*
 * SocialAuth.tsx
 * author: evan kirkiles
 * created on Tue Sep 06 2022
 * 2022 the nobot space,
 */
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Button,
  Checkbox,
  IconKey,
  IconLock,
  IconMail,
  Input,
  Space,
  Typography,
} from '@supabase/ui';
import { useEffect, useRef, useState } from 'react';
import { RedirectTo, VIEWS, ViewType } from '../Auth';
import s from '../../../components/Auth/Auth.module.scss';
import { useRouter } from 'next/router';

type EmailAuthProps = {
  authView?: ViewType;
  defaultEmail: string;
  defaultPassword: string;
  id: 'auth-sign-up' | 'auth-sign-in';
  setAuthView?: any;
  setDefaultEmail: (email: string) => void;
  setDefaultPassword: (password: string) => void;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  magicLink?: boolean;
};

export function EmailAuth({
  authView,
  defaultEmail,
  defaultPassword,
  id,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  redirectTo,
  magicLink,
}: EmailAuthProps) {
  // statefuls
  const router = useRouter();
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView, defaultEmail, defaultPassword]);

  /* -------------------------------------------------------------------------- */
  /*                                SUBMIT EMAIL                                */
  /* -------------------------------------------------------------------------- */
  // submits login / signup with email
  const handleSubmit = async () => {
    setError('');
    if (!email) {
      setError('Please fill out both fields!');
      return;
    }
    if (!password) {
      setError('Please fill out both fields!');
      return;
    }
    setLoading(true);
    switch (authView) {
      case 'sign_in':
        const { error: signInError } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) setError(signInError.message);
        else if (redirectTo) router.replace(redirectTo);
        break;
      case 'sign_up':
        const { data: signUpData, error: signUpError } =
          await supabaseClient.auth.signUp({
            email,
            password,
          });
        if (signUpError) setError(signUpError.message);
        // Check if session is null -> email confirmation setting is turned on
        else if (signUpData.user && !signUpData.session)
          setMessage('Check your email for the confirmation link.');
        else if (redirectTo) router.replace(redirectTo);
        break;
    }

    /*
     * it is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    setLoading(false);
  };

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  return (
    // <form id={id} onSubmit={handleSubmit}>
    <Space size={6} direction={'vertical'}>
      <Space size={3} direction={'vertical'}>
        <label className={s.sbui_input_label_text} htmlFor={'userEmail'}>
          Email address
        </label>
        <div className={s.input_container}>
          <input
            type="email"
            aria-label="Email"
            value={email}
            className={s.sbui_input}
            id="userEmail"
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <div className={s.sbui_input_label}>
            <IconMail size={21} stroke={'#666666'} />
          </div>
        </div>
        <label className={s.sbui_input_label_text} htmlFor={'userPassword'}>
          Password
        </label>
        <div className={s.input_container}>
          <input
            type="password"
            aria-label="Password"
            value={password}
            className={s.sbui_input}
            id={'userPassword'}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <div className={s.sbui_input_label}>
            <IconKey size={21} stroke={'#666666'} />
          </div>
        </div>
      </Space>
      <Space direction="vertical" size={6}>
        <Space style={{ justifyContent: 'space-between' }}>
          <Checkbox
            label="Remember me"
            name="remember_me"
            id="remember_me"
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setRememberMe(value.target.checked)
            }
          />
          {authView === VIEWS.SIGN_IN && (
            <Typography.Link
              href="#auth-forgot-password"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView(VIEWS.FORGOTTEN_PASSWORD);
              }}
            >
              Forgot your password?
            </Typography.Link>
          )}
        </Space>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          icon={<IconLock size={21} />}
          loading={loading}
          onClick={() => handleSubmit()}
          block
        >
          {authView === VIEWS.SIGN_IN ? 'Sign in' : 'Sign up'}
        </Button>
      </Space>
      <Space direction="vertical" style={{ textAlign: 'center' }}>
        {authView === VIEWS.SIGN_IN && magicLink && (
          <Typography.Link
            href="#auth-magic-link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setAuthView(VIEWS.MAGIC_LINK);
            }}
          >
            Sign in with magic link
          </Typography.Link>
        )}
        {authView === VIEWS.SIGN_IN ? (
          <Typography.Link
            href="#auth-sign-up"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              handleViewChange(VIEWS.SIGN_UP);
            }}
          >
            Don&apos;t have an account? Sign up
          </Typography.Link>
        ) : (
          <Typography.Link
            href="#auth-sign-in"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              handleViewChange(VIEWS.SIGN_IN);
            }}
          >
            Do you have an account? Sign in
          </Typography.Link>
        )}
        {message && <Typography.Text>{message}</Typography.Text>}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Space>
    </Space>
    // </form>
  );
}
