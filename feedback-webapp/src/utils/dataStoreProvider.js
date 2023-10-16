import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
const feedbackStore = storage.getCollectionDataStore("pageFeedback");

export const addData = (data) => {
    let result;
    try {
        result = feedbackStore.add(data);
        feedbackStore.instantIndex(result.dsid);
    } catch (err) {
        logUtil.info("Could not write to DataStore");
    }
    return result;
}

export const getAllFeedback = () => {
    return feedbackStore.find(`ds.analyzed.page:*`).toArray();
}

export const getPagesById = (feedbackPageId) => {
    return feedbackStore.find(`ds.analyzed.page:${feedbackPageId}*`).toArray();
}