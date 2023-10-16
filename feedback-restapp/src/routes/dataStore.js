import events from "@sitevision/api/server/events";
import storage from "@sitevision/api/server/storage";
import logUtil from "@sitevision/api/server/LogUtil";

const dataStore = storage.getCollectionDataStore("pageFeedback");

let updateFeedbackStatus = (page) => {

  let feedback = dataStore
    .find(`ds.analyzed.page:${page} ds.analyzed.isOutdated:false`, { count: 100 })
    .toArray();
  feedback.forEach((feedbackData) => {
    if (!feedbackData.isOutdated) {
      feedbackData.isOutdated = true;
      try {
        dataStore.set(feedbackData.dsid, feedbackData);
      } catch (e) {
        logUtil.info("Could not write to DataStore");
      }
    }
  });
};

events.on("sv:publishing:publish", (options) => {
    updateFeedbackStatus(options.node);
  });