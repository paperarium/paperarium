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
import TimelineCard from '../components/TimelineCard/TimelineCard';

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
        <div>
          <Timeline position="alternate-reverse">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineCard title={'Pepakura Launched'}></TimelineCard>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineCard title={'Paperpokes Founded'}></TimelineCard>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineCard
                  title={'Nintendo Papercraft Founded'}
                ></TimelineCard>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineCard
                  title={'Nintendo Papercraft Contest'}
                ></TimelineCard>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
