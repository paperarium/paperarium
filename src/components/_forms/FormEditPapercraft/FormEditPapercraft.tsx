/*
 * FormEditPapercraft.tsx
 * author: evan kirkiles
 * created on Sun Sep 18 2022
 * 2022 the nobot space,
 */
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { debounce } from 'ts-debounce';
import { listTags } from '../../../supabase/api/tags';
import * as APIt from '../../../supabase/types';
import FileUpload from '../../FileUpload/FileUpload';
import { AsyncSelect, getSelectTheme, Select } from '../../misc/AsyncSelect';
import MultiFileUpload from '../../MultiFileUpload/MultiFileUpload';
import s from './FormEditPapercraft.module.scss';
import { uploadFile, uploadImageFile } from '../../../util/uploadFile';
import {
  createPapercraft,
  deletePapercraftVariants,
  insertPapercraftVariants,
  papercraftKeys,
  updatePapercraft,
  upsertPapercraftVariants,
} from '../../../supabase/api/papercrafts';
import { createBuild } from '../../../supabase/api/builds';
import {
  createPapercraftsTags,
  deletePapercraftsTags,
} from '../../../supabase/api/papercraftstags';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// lazy load date picker component
import { DatePicker } from '../../misc/DatePicker';
import MultiItemCreate from '../../MultiItemCreate/MultiItemCreate';
import ItemRendererVariant from '../../MultiItemCreate/ItemRendererVariant';
import {
  SupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';

// debounce the fetch tags function
const fetchTags = (supabaseClient: SupabaseClient) =>
  debounce(listTags(supabaseClient), 300, { maxWait: 1200 });

/* -------------------------------------------------------------------------- */
/*                                   TYPINGS                                  */
/* -------------------------------------------------------------------------- */

export type FormEditPapercraftHandleProps = {
  getPapercraft: () => APIt.Papercraft;
  submitPapercraft: () => void;
};

type FormEditPapercraftProps = {
  profile: APIt.Profile;
  defaultPapercraft?: APIt.Papercraft;
  children?: React.ReactNode;
  isAdmin?: boolean;
  setSubmissionMessage: (message: string) => void;
  setCanPreview: (canPreview: boolean) => void;
  onSuccess: (papercraft: APIt.Papercraft) => void;
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const FormEditPapercraft: React.ForwardRefRenderFunction<
  FormEditPapercraftHandleProps,
  FormEditPapercraftProps
> = function FormEditPapercraft(
  {
    defaultPapercraft,
    profile,
    isAdmin,
    setSubmissionMessage,
    setCanPreview,
    onSuccess,
    children,
  },
  forwardedRef
) {
  /* -------------------------------------------------------------------------- */
  /*                                 INPUT FORM                                 */
  /* -------------------------------------------------------------------------- */
  // state managers for the state of the papercraft
  const { supabaseClient } = useSessionContext();
  const queryClient = useQueryClient();

  // input form fields
  const [title, setTitle] = useState<string>(defaultPapercraft?.title || '');
  const [createdAt, setCreatedAt] = useState<Date>(
    defaultPapercraft ? new Date(defaultPapercraft.created_at) : new Date()
  );
  const [description, setDescription] = useState<string>(
    defaultPapercraft?.description || ''
  );
  const [tags, setTags] = useState<APIt.Tag[]>(defaultPapercraft?.tags || []);
  const [images, setImages] = useState<
    ((File & { blobURL: string }) | APIt.Picture)[] | null
  >(defaultPapercraft?.pictures || null);
  const [pdo, setPdo] = useState<File | string | null>(
    defaultPapercraft?.pdo_url || null
  );
  const [pdfLined, setPdfLined] = useState<File | string | null>(
    defaultPapercraft?.pdf_lined_url || null
  );
  const [pdfLineless, setPdfLineless] = useState<File | string | null>(
    defaultPapercraft?.pdf_lineless_url || null
  );
  const [glb, setGlb] = useState<File | string | null>(
    defaultPapercraft?.glb_url || null
  );
  const [difficulty, setDifficulty] = useState<APIt.Difficulty>(
    defaultPapercraft?.difficulty || APIt.Difficulty.Easy
  );
  const [dLength, setDLength] = useState<number | ''>(
    defaultPapercraft?.dimensions_cm ? defaultPapercraft.dimensions_cm[0] : ''
  );
  const [dWidth, setDWidth] = useState<number | ''>(
    defaultPapercraft?.dimensions_cm ? defaultPapercraft.dimensions_cm[1] : ''
  );
  const [dHeight, setDHeight] = useState<number | ''>(
    defaultPapercraft?.dimensions_cm ? defaultPapercraft.dimensions_cm[2] : ''
  );
  const [dUnits, setDUnits] = useState<'in' | 'cm'>('cm');
  const [xLink, setXLink] = useState<string>(defaultPapercraft?.xlink || '');
  const [isBuild, setIsBuild] = useState(false);
  // keep track of variants
  const [variants, setVariants] = useState<APIt.PapercraftVariantLocal[]>(
    defaultPapercraft?.variants.map((variant) => ({
      ...variant,
      pdo_url: variant.pdo_url ?? null,
      pdf_lined_url: variant.pdf_lined_url ?? null,
      pdf_lineless_url: variant.pdf_lineless_url ?? null,
    })) ?? []
  );

  /* -------------------------------------------------------------------------- */
  /*                             IMPERATIVE HANDLING                            */
  /* -------------------------------------------------------------------------- */

  // checks if can show preview
  useEffect(() => {
    setCanPreview(!!(title && description && (!!pdfLineless || !!pdfLined)));
  }, [title, description, pdfLineless, pdfLined, setCanPreview]);

  // builds a preview papercraft from the user's information
  const getPapercraft = () => {
    if (!images) throw 'no images!';
    if (!profile) throw 'no profile yet!';
    const builds: APIt.Build[] = defaultPapercraft?.builds || [];
    const display_build: APIt.Build | undefined =
      defaultPapercraft?.display_build ??
      (isBuild
        ? {
            user: profile,
            id: '',
            created_at: '',
            updated_at: '',
            description: null,
            xlink: null,
            user_id: profile.id,
            papercraft_id: '',
            pictures: [],
            verified: true,
            papercraft: undefined as unknown as APIt.Papercraft,
            n_likes: 0,
          }
        : undefined);
    const papercraft: APIt.Papercraft = {
      id: defaultPapercraft?.id || '',
      user_id: profile.id,
      created_at: createdAt.toISOString(),
      updated_at: new Date().toDateString(),
      title: title,
      description: description,
      collective_id: null,
      build_id: null,
      glb_url: glb
        ? typeof glb === 'string'
          ? glb
          : URL.createObjectURL(glb)
        : null,
      pdo_url: pdo
        ? typeof pdo === 'string'
          ? pdo
          : URL.createObjectURL(pdo)
        : null,
      pdf_lineless_url: pdfLineless
        ? typeof pdfLineless === 'string'
          ? pdfLineless
          : URL.createObjectURL(pdfLineless)
        : null,
      pdf_lined_url: pdfLined
        ? typeof pdfLined === 'string'
          ? pdfLined
          : URL.createObjectURL(pdfLined)
        : null,
      pictures: images.map((img) =>
        (img as File & { blobURL?: string }).blobURL
          ? {
              key: (img as File & { blobURL: string }).blobURL,
              width: 0,
              height: 0,
            }
          : (img as APIt.Picture)
      ),
      difficulty: difficulty,
      dimensions_cm:
        dLength && dWidth && dHeight
          ? [dLength, dWidth, dHeight].map(
              (val) => val * (dUnits === 'cm' ? 1 : 2.54)
            )
          : null,
      verified: false,
      xlink: xLink,
      display_build,
      builds,
      user: defaultPapercraft?.user || profile,
      tags: tags,
      variants: variants.map((variant) => ({
        ...variant,
        pdo_url: variant.pdo_url
          ? typeof variant.pdo_url !== 'string'
            ? URL.createObjectURL(variant.pdo_url)
            : variant.pdo_url
          : null,
        pdf_lineless_url: variant.pdf_lineless_url
          ? typeof variant.pdf_lineless_url !== 'string'
            ? URL.createObjectURL(variant.pdf_lineless_url)
            : variant.pdf_lineless_url
          : null,
        pdf_lined_url: variant.pdf_lined_url
          ? typeof variant.pdf_lined_url !== 'string'
            ? URL.createObjectURL(variant.pdf_lined_url)
            : variant.pdf_lined_url
          : null,
      })),
      n_builds: 1,
      n_likes: 0,
    };
    return papercraft;
  };

  // submits the papercraft, either creating it (if no default papercraft was
  // specified) or updating it (if a default papercraft was specified).
  const submitPapercraft = useMutation(
    async () => {
      // do some quick form validation
      if (!profile) throw "couldn't get profile!";
      if (!title) throw 'missing title!';
      if (!description) throw 'missing description!';
      if (images === null || images.length === 0) throw 'missing images!';
      if (!pdfLined && !pdfLineless) throw 'missing a pdf!';

      // set submitting message
      setSubmissionMessage('Uploading pictures...');

      // now generate the key for uploading things to the papercraft––note
      // that papercrafts with the same name WILL overlap. but this is imperative
      // for allowing both updating and creating of crafts.
      // ! TODO: update this to use a UUID retrieved from the papercraft. if a
      // user changes the title of their papercraft, files will be uploaded in
      // a different directory.
      const PAPERCRAFT_KEY_PREFIX = `${profile.id}/papercrafts/${title.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ''
      )}`;

      // 1. upload the images of the papercraft. if images existed in the default
      //    papercraft, make sure we only upload new images that have appeared.
      //    that is, only upload files, not picture object images.
      const pictures: APIt.Picture[] = [];
      for (let i = 0; i < images.length; i++) {
        if ((images[i] as any).blobURL === undefined) {
          pictures.push(images[i] as APIt.Picture);
          continue;
        }
        const i_file = images[i] as File;
        const { name } = i_file;
        const fileName = `${PAPERCRAFT_KEY_PREFIX}/IMAGE_${i}_${name.replace(
          /[^a-zA-Z0-9-_\.]/g,
          ''
        )}`;
        pictures.push(await uploadImageFile(supabaseClient, fileName, i_file));
      }

      // 2. upload the papercraft files.
      setSubmissionMessage('Uploading files...');

      // 2.1. GLB - for in-browser 3d view
      let glb_url: string | undefined = undefined;
      if (glb) {
        if (typeof glb !== 'string') {
          const glb_file = `${PAPERCRAFT_KEY_PREFIX}/${glb.name.replace(
            /[^a-zA-Z0-9-_\.]/g,
            ''
          )}`;
          glb_url = await uploadFile(supabaseClient, glb_file, glb);
        } else {
          glb_url = glb;
        }
      }

      // 2.2. PDF (lined) - for more beginner papercrafts
      let pdf_lined_url: string | undefined = undefined;
      if (pdfLined) {
        if (typeof pdfLined !== 'string') {
          const pdf_lined_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLined.name.replace(
            /[^a-zA-Z0-9-_\.]/g,
            ''
          )}`;
          pdf_lined_url = await uploadFile(
            supabaseClient,
            pdf_lined_file,
            pdfLined
          );
        } else {
          pdf_lined_url = pdfLined;
        }
      }

      // 2.3. PDF (lineless) - for the usual papercrafter
      let pdf_lineless_url: string | undefined = undefined;
      if (pdfLineless) {
        if (typeof pdfLineless !== 'string') {
          const pdf_lineless_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLineless.name.replace(
            /[^a-zA-Z0-9-_\.]/g,
            ''
          )}`;
          pdf_lineless_url = await uploadFile(
            supabaseClient,
            pdf_lineless_file,
            pdfLineless
          );
        } else {
          pdf_lineless_url = pdfLineless;
        }
      }

      // 2.3. PDO - a guide for how to put together the craft
      let pdo_url: string | undefined = undefined;
      if (pdo) {
        if (typeof pdo !== 'string') {
          const pdo_file = `${PAPERCRAFT_KEY_PREFIX}/${pdo.name.replace(
            /[^a-zA-Z0-9-_\.]/g,
            ''
          )}`;
          pdo_url = await uploadFile(supabaseClient, pdo_file, pdo);
        } else {
          pdo_url = pdo;
        }
      }

      // 3. build the papercraft
      let papercraft: APIt.Papercraft | undefined = defaultPapercraft;
      // if no papercraft id, we need to create this papercraft
      if (!papercraft) {
        setSubmissionMessage('Creating design entry...');
        papercraft = (
          await createPapercraft(supabaseClient)({
            user_id: profile.id,
            title,
            created_at: createdAt.toISOString(),
            description,
            glb_url,
            pdo_url,
            pdf_lineless_url,
            pdf_lined_url,
            pictures,
            difficulty: difficulty,
            xlink: xLink,
            dimensions_cm:
              dLength && dWidth && dHeight
                ? [dLength, dWidth, dHeight].map(
                    (val) => val * (dUnits === 'cm' ? 1 : 2.54)
                  )
                : undefined,
            verified: false,
          })
        )[0];
        // otherwise, we're just updating the entry
      } else {
        setSubmissionMessage('Updating design entry...');
        papercraft = await updatePapercraft(supabaseClient)(papercraft.id, {
          title,
          created_at: createdAt.toISOString(),
          description,
          glb_url,
          pdo_url,
          pdf_lineless_url,
          pdf_lined_url,
          pictures,
          difficulty: difficulty,
          xlink: xLink,
          dimensions_cm:
            dLength && dWidth && dHeight
              ? [dLength, dWidth, dHeight].map(
                  (val) => val * (dUnits === 'cm' ? 1 : 2.54)
                )
              : undefined,
        });
      }

      // 4. upload the variants' files. if the file is a string, it is already
      // uploaded. if not, then we need to create it.
      setSubmissionMessage('Uploading variant files...');
      const variantCreates: APIt.PapercraftVariantInput[] = [];
      const variantUpserts: APIt.PapercraftVariantInput[] = [];
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        if (
          !variant.title ||
          (!variant.pdf_lineless_url && !variant.pdf_lined_url)
        )
          continue;
        const VARIANT_FILES: {
          [key in 'pdo_url' | 'pdf_lined_url' | 'pdf_lineless_url']:
            | string
            | undefined;
        } = {
          pdo_url: undefined,
          pdf_lined_url: undefined,
          pdf_lineless_url: undefined,
        };
        // attempt to upload local files
        for (const fileType in VARIANT_FILES) {
          const url_type = fileType as
            | 'pdo_url'
            | 'pdf_lined_url'
            | 'pdf_lineless_url';
          switch (typeof variant[url_type]) {
            // if no file, we don't care
            case 'undefined':
              break;
            // if string, file is already uploaded
            case 'string':
              VARIANT_FILES[url_type] = variant[url_type] as string;
              break;
            // if a local file, we need to upload the file
            default:
              const file = variant[url_type] as File;
              const file_name = `${PAPERCRAFT_KEY_PREFIX}/${file.name.replace(
                /[^a-zA-Z0-9-_\.]/g,
                ''
              )}`;
              VARIANT_FILES[url_type] = await uploadFile(
                supabaseClient,
                file_name,
                file
              );
          }
        }

        // add the upsert to the list
        const newVariant: APIt.PapercraftVariantInput = {
          ...variant,
          ...VARIANT_FILES,
          user_id: profile.id,
          papercraft_id: papercraft!.id,
          id: !!variant.created_at ? variant.id : undefined,
        };
        // if this is a new variant, don't update
        if (!variant.created_at) {
          delete newVariant['id'];
          newVariant.created_at = new Date().toISOString();
          variantCreates.push(newVariant);
        } else {
          variantUpserts.push(newVariant);
        }
      }
      // also keep track of all variants that are no longer present
      const variantDeletes: number[] = [];
      if (defaultPapercraft) {
        for (const variant of defaultPapercraft.variants) {
          if (!variants.some(({ id }) => id === variant.id)) {
            variantDeletes.push(variant.id);
          }
        }
      }

      // 5. perform upserts + pruning
      setSubmissionMessage('Pruning variant entries...');
      await deletePapercraftVariants(supabaseClient)(variantDeletes);
      setSubmissionMessage('Upserting variant entries...');
      await insertPapercraftVariants(supabaseClient)(variantCreates);
      await upsertPapercraftVariants(supabaseClient)(variantUpserts);

      // 6. if this was uploaded as a build, cross-post it to user's builds
      if (isBuild) {
        setSubmissionMessage('Creating build entry...');
        const build_id = (
          await createBuild(supabaseClient)({
            user_id: profile.id,
            papercraft_id: papercraft!.id,
            description: '',
            pictures,
            xlink: xLink,
            verified: false,
          })
        )[0].id;
        setSubmissionMessage('Linking build entry to papercraft...');
        await updatePapercraft(supabaseClient)(papercraft!.id, {
          build_id,
        });
      }

      // 7. if editing papercraft, delete all old tags
      if (defaultPapercraft) {
        setSubmissionMessage('Pruning old tags...');
        const papercraft_tags_deletions = [];
        for (const papercraft_tag of defaultPapercraft.tags) {
          papercraft_tags_deletions.push(
            deletePapercraftsTags(supabaseClient)(
              defaultPapercraft.id,
              papercraft_tag.id
            )
          );
        }
        await Promise.all(papercraft_tags_deletions);
      }

      // 7. now build the new papercrafts tags.
      setSubmissionMessage('Linking new tags...');
      const papercraft_tags_input: APIt.PapercraftsTagsInput[] = [];
      for (const papercraft_tag of tags) {
        papercraft_tags_input.push({
          papercraft_id: papercraft!.id,
          tag_id: papercraft_tag.id,
        });
      }
      await createPapercraftsTags(supabaseClient)(papercraft_tags_input);

      // 6. Finished!
      setSubmissionMessage('Done!');
      return papercraft;
    },
    {
      onSuccess: (papercraft) => {
        // use the query client to invalidate any papercraft searches
        queryClient.invalidateQueries(papercraftKeys.lists());
        queryClient.invalidateQueries(papercraftKeys.get(papercraft!.id));
        onSuccess(papercraft!);
      },
    }
  );

  // imperative handle allows us to retrieve the papercraft from this form, as
  // well as trigger events to submit the form.
  useImperativeHandle(forwardedRef, () => ({
    getPapercraft,
    submitPapercraft: submitPapercraft.mutate,
  }));

  /* -------------------------------------------------------------------------- */
  /*                                  COMPONENT                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <div className={s.form_container}>
      {children}
      <div className={s.form_inner_container}>
        {/* TITLE INPUT */}
        <div className={s.annotation} style={{ marginTop: '0px' }}>
          Title * –– <i>what is this papercraft of?</i>
        </div>
        <TextareaAutosize
          className={s.title_input}
          placeholder={'Write a title...'}
          spellCheck={false}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value.replace(/  |\r\n|\n|\r/gm, ''));
          }}
        ></TextareaAutosize>
        {isAdmin ? (
          <>
            <div className={s.annotation}>
              Creation Date (admin) * ––{' '}
              <i>when was this papercraft created?</i>
            </div>
            <DatePicker
              selected={createdAt}
              onChange={(date: Date) => {
                setCreatedAt(date);
              }}
              className={s.date_picker}
            />
          </>
        ) : null}
        <div className={s.annotation}>
          Description * ––{' '}
          <i>background information on the character / papercraft?</i>
        </div>
        <TextareaAutosize
          className={s.description_input}
          placeholder={'Write a description...'}
          spellCheck={false}
          value={description}
          minRows={3}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></TextareaAutosize>
        <div className={s.annotation}>
          Tags ––{' '}
          <i>
            select up to 5 relevant tags so people can find your papercraft!
          </i>
        </div>
        <AsyncSelect
          isMulti
          loadOptions={async (search: string) =>
            fetchTags(supabaseClient)({ search })
          }
          className={s.tag_input}
          defaultValue={tags || []}
          getOptionLabel={(option: unknown) => (option as APIt.Tag).name}
          getOptionValue={(option: unknown) =>
            (option as APIt.Tag).id as unknown as string
          }
          isOptionDisabled={() => tags.length >= 5}
          onChange={(tags: readonly APIt.Tag[]) => setTags(tags as APIt.Tag[])}
          theme={getSelectTheme}
        />
        <div className={s.difficulty_row}>
          <div className={s.difficulty_col}>
            <div className={s.annotation}>
              Difficulty * –– <i>how hard is this papercraft?</i>
            </div>
            <Select
              instanceId={'tag_select'}
              className={s.tag_select}
              isClearable={false}
              defaultValue={{
                value: APIt.Difficulty.Easy,
                label: 'easy',
              }}
              options={Object.entries(APIt.Difficulty)
                .filter(([key]) => !isNaN(Number(key)))
                .map(([value, key]) => ({ value, label: key }))}
              onChange={(difficulty: string) =>
                setDifficulty((difficulty! as any).value)
              }
              theme={getSelectTheme}
            />
          </div>
          <div className={s.difficulty_col}>
            <div className={s.annotation}>
              Dimensions –– <i>and how big? length / width / height</i>
            </div>
            <div className={s.dimensions_row}>
              <input
                className={s.dimension_input}
                value={dLength}
                min="0"
                type="number"
                placeholder={'l'}
                onChange={(e) => {
                  setDLength(parseFloat(e.target.value));
                }}
              />
              <input
                className={s.dimension_input}
                value={dWidth}
                min="0"
                type="number"
                placeholder={'w'}
                onChange={(e) => {
                  setDWidth(parseFloat(e.target.value));
                }}
              />
              <input
                className={s.dimension_input}
                value={dHeight}
                min="0"
                type="number"
                placeholder={'h'}
                onChange={(e) => {
                  setDHeight(parseFloat(e.target.value));
                }}
              />
              <Select
                instanceId={'dimensions_unit_select'}
                className={s.dimension_select}
                isClearable={false}
                defaultValue={{
                  value: dUnits,
                  label: dUnits,
                }}
                options={[
                  { value: 'cm', label: 'cm' },
                  { value: 'in', label: 'in' },
                ]}
                onChange={(units: any) => {
                  setDUnits(units);
                }}
                theme={getSelectTheme}
              />
            </div>
          </div>
        </div>
        <div className={s.file_row}>
          <div className={s.file_col} style={{ flex: 1 }}>
            <div className={s.annotation}>
              Image * –– <i>what does the craft look like?</i>
            </div>
            <MultiFileUpload
              files={images}
              setFiles={(newimgs) => {
                if (newimgs == null) {
                  setImages(null);
                } else {
                  const newImages: typeof images = [];
                  for (let i = 0; i < newimgs.length; i++) {
                    if ((newimgs[i] as File).name !== undefined) {
                      (newimgs[i] as any).blobURL = URL.createObjectURL(
                        newimgs[i] as File
                      );
                    }
                    newImages.push(newimgs[i] as any);
                  }
                  setImages(newImages);
                }
              }}
              accept={'image/*'}
            >
              .PNG, .JPG...
            </MultiFileUpload>
          </div>
          <div className={s.file_col} style={{ flex: 2 }}>
            <div className={s.annotation}>
              Files * –– <i>the craft itself.</i>
            </div>
            <FileUpload file={pdo} setFile={setPdo} accept={'.pdo'} withIcon>
              .PDO
            </FileUpload>
            <FileUpload
              file={pdfLineless ? pdfLineless : null}
              setFile={setPdfLineless}
              accept={'application/pdf'}
              withIcon
            >
              .PDF - lineless
            </FileUpload>
            <FileUpload
              file={pdfLined ? pdfLined : null}
              setFile={setPdfLined}
              accept={'application/pdf'}
              withIcon
            >
              .PDF - lined
            </FileUpload>
            <FileUpload file={glb} setFile={setGlb} accept={'.glb'} withIcon>
              .GLB
            </FileUpload>
          </div>
        </div>
        <div className={s.annotation}>
          Variants? ––{' '}
          <i>add more PDOs and PDFs here, be they parts or recolors.</i>
        </div>
        <MultiItemCreate
          contentsAddButton={'+ Add a variant +'}
          items={variants}
          defaultItem={{
            user_id: profile.id,
            created_at: '',
            papercraft_id: '',
            title: '',
            pdo_url: null,
            pdf_lined_url: null,
            pdf_lineless_url: null,
          }}
          setItems={setVariants}
          ItemComponent={ItemRendererVariant}
          validateItem={(variant) =>
            !!(
              variant.title &&
              (variant.pdf_lineless_url || variant.pdf_lined_url)
            )
          }
        />
        <div className={s.annotation}>
          Source link? –– <i>feel free to link your own hosted version here.</i>
        </div>
        <div className={s.more_row}>
          <input
            type="text"
            className={s.file_input}
            value={xLink}
            onChange={(e) => setXLink(e.target.value)}
          />
        </div>
        {!defaultPapercraft ? (
          <>
            <div className={s.annotation}>
              Is this built? ––{' '}
              <i>check to cross-upload the images as your own build.</i>
            </div>
            <div className={s.more_row}>
              <input
                type="checkbox"
                id="ibuiltthis"
                checked={isBuild}
                onChange={(e) => setIsBuild(e.target.checked)}
              />
              <label htmlFor="ibuiltthis">
                yes, i confirm that this papercraft is built!
              </label>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default forwardRef(FormEditPapercraft);
