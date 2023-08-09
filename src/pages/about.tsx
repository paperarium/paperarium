import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import s from '../styles/About.module.scss';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>about - paperarium</title>
        <NextSeo
          canonical={'https://paperarium.place/about'}
          description={'about paperarium itself.'}
        />
      </Head>
      <div className={s.login_page_container}>
        <h1>The History of Papercraftding</h1>
        <div style={{ background: 'red' }}>
          <div>Nintendo papercraft released</div>
          <div>Haywan Lifesiez Link</div>
          <div>Char Ganondorf</div>
          <div>Nintendo papercrat contest</div>
          <div>Ninjatoes</div>
          <Timeline position="left">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div>Pepakura released</div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div style={{ background: 'blue' }}>Paperpokes</div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Repeat</TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
