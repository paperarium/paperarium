/*
 * index.tsx
 * author: evan kirkiles
 * created on Wed Sep 07 2022
 * 2022 the nobot space,
 */
import { IoPersonOutline, IoHomeOutline, IoCubeOutline, IoBuildOutline, IoShapesOutline, IoPricetagOutline } from "react-icons/io5";
import * as APIt from "../../supabase/types";
import AdminBuildsPane from "./panes/AdminBuilds";
import AdminHomePane from "./panes/AdminHome";
import AdminPapercraftsPane from "./panes/AdminPapercrafts";
import AdminProfilesPane from "./panes/AdminProfiles";
import AdminTagsPane from "./panes/AdminTags";

type AdminPaneObj = {
  icon: JSX.Element;
  pane: React.FC<AdminPaneProps>;
};

export enum AdminPane {
  Home = "home",
  Profile = "profile",
  Papercrafts = "papercrafts",
  Builds = "builds",
  Tags = "tags"
}

// export type AdminPane = keyof typeof ADMIN_PANES;

export const ADMIN_PANES: { [key in AdminPane]: AdminPaneObj } = {
  [AdminPane.Home]: {
    icon: <IoHomeOutline />,
    pane: AdminHomePane,
  },
  [AdminPane.Profile]: {
    icon: <IoPersonOutline />,
    pane: AdminProfilesPane,
  },
  [AdminPane.Papercrafts]: {
    icon: <IoShapesOutline />,
    pane: AdminPapercraftsPane,
  },
  [AdminPane.Builds]: {
    icon: <IoCubeOutline />,
    pane: AdminBuildsPane,
  },
  [AdminPane.Tags]: {
    icon: <IoPricetagOutline />,
    pane: AdminTagsPane
  }
};

export type AdminPaneProps = {
  activeProfile: APIt.Profile | null;
  setActiveProfile: (newProfile: APIt.Profile | null) => void;
};
