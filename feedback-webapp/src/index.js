import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import storage from "@sitevision/api/server/storage";
import properties from "@sitevision/api/server/Properties";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
// import propertyUtil from '@sitevision/api/server/PropertyUtil';
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
//import privileged from "@sitevision/api/server/privileged";
import versionUtil from "@sitevision/api/server/VersionUtil";
import roleUtil from '@sitevision/api/server/RoleUtil';
import systemUserUtil from "@sitevision/api/server/SystemUserUtil";
import i18n from "@sitevision/api/common/i18n";

import { sendMail } from './api/api';
import { getPagesById } from './utils/dataStoreProvider';

const feedbackStore = storage.getCollectionDataStore("pageFeedback");

const isAdmin = () => {
  const currentUser = portletContextUtil.getCurrentUser();
  const currentPage = portletContextUtil.getCurrentPage();
  const admin = roleUtil.getRoleByName("Administrator");
  let roleBuilder = roleUtil.getRoleMatcherBuilder();
  roleBuilder.addRole(admin);
  roleBuilder.setUser(currentUser);
  let isAdminMatcher = roleBuilder.build();
 
  return isAdminMatcher.matchesAll(currentPage);
}

router.use((req, res, next) => {
  if (systemUserUtil.isAnonymous()) {
    if (req.xhr) {
      return res.status(401).json({ errorMsg: i18n.get('signedOut') });
    }
  } else {
    req.data = {
      isAdmin: isAdmin()
    }
  
    next();

  }
});


router.get("/", (req, res) => {

  if(versionUtil.getCurrentVersion() != versionUtil.ONLINE_VERSION) {    
    return res.send(
      `<span class="env-text">
    ${i18n.get("offlineMode")}
    </span>`
    );
  }
  let feedback = [];
  let isInEditor = versionUtil.getCurrentVersion() != versionUtil.ONLINE_VERSION ? true : false;
  const isAdmin = req.data.isAdmin;

  if(req.data.isAdmin) {
  const currentPage = portletContextUtil.getCurrentPage();
  const currentPageId = currentPage.getIdentifier();
  feedback = getPagesById(currentPageId).map(feed => {
    const id = feed.userId;
    const node = resourceLocatorUtil.getNodeByIdentifier(id);
  
    const userName = properties.get(node, 'displayName');
    return {
      ...feed, 
      userName
    }
  });
}

  res.agnosticRender(renderToString(<App isInEditor={isInEditor} isAdmin={isAdmin} feedback={feedback} />), {
    isInEditor,
    isAdmin,
    feedback
  });
  
});

router.post("/feedback", (req, res) => { 
  let { feedback } = req.params;
  const isOutdated = false;
  let page = portletContextUtil.getCurrentPage().getIdentifier();
  const pageNode = resourceLocatorUtil.getNodeByIdentifier(page);
  const pageName = properties.get(pageNode, 'displayName');
  const pageData = properties.get(pageNode, pageName, "URI");
 

  const post = feedbackStore.add({
    page: page,
    userId: portletContextUtil.getCurrentUser().getIdentifier(),
    feedback,
    isOutdated,
  });

  feedbackStore.instantIndex(post.dsid);

  const mail = {
    email: appData.get('email'),
    feedback: feedback,
    pageName: pageName,
    pageURL: pageData.Url,
};

  if (post) {
    try {
      sendMail(mail);
    } catch (error) {
      return res.status(400).send(`Failed to send mail, ${error}`);
    }
    return res.status(204).send("Feedback successfully stored.");
  } else {
    return res.status(400).send("Failed to store feedback.");
  }
});