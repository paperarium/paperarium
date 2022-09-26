/*
 * [pid]/preview.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPapercraft, papercraftKeys } from '../../supabase/api/papercrafts';
import s from '../../styles/papercrafts/PapercraftPreview.module.scss';
import { NextSeo } from 'next-seo';
import FallbackOverlay from '../../components/FallbackOverlay/FallbackOverlay';
import Model3DView from '../../components/Model3DView/Model3DView';

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

const PapercraftPreviewPage: NextPage = function PapercraftPreviewPage({}) {
  // use a fallback loading indicator
  const router = useRouter();
  const { pid }: { pid?: string } = router.query;
  // get the cached papercraft query. we will also re-get the papercraft likes
  const papercraft = useQuery(
    papercraftKeys.get(pid!),
    () => getPapercraft(pid!),
    {
      enabled: !!pid,
    }
  );

  return (
    <>
      <Head>
        <title>{`${papercraft.data?.title} - paperarium`}</title>
        <meta property="og:url" content={router.asPath} />
        <NextSeo
          canonical={`https://paperarium.place/papercrafts/${pid}`}
          description={'edit your profile here.'}
          title={papercraft.data ? `${papercraft.data.title}` : undefined}
          openGraph={{
            url: router.basePath,
            title: papercraft.data
              ? `${papercraft.data.title} on paperarium`
              : undefined,
            description: papercraft.data
              ? `view @${papercraft.data.user.username}'s ${papercraft.data.title} on paperarium!`
              : undefined,
            images: papercraft.data
              ? papercraft.data.pictures.map((pic) => ({
                  url: `${process.env.IMGIX}/${pic.key}`,
                  width: pic.width,
                  height: pic.height,
                }))
              : undefined,
          }}
        />
      </Head>
      <div className={s.container}>
        <div className={s.model_display}>
          <Model3DView />
        </div>
        <FallbackOverlay />
      </div>
    </>
  );
};

export default PapercraftPreviewPage;
