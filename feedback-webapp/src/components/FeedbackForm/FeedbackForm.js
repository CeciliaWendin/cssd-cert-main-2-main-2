import * as React from 'react';
import PropTypes from 'prop-types';
import router from '@sitevision/api/common/router';
import toasts from '@sitevision/api/client/toasts';
import events from "@sitevision/api/common/events";
import requester from '@sitevision/api/client/requester';
import i18n from '@sitevision/api/common/i18n';

const FeedbackForm = () => {
   const onSubmit = (e) => {
      e.preventDefault();
      
      const form = e.currentTarget;
      // eslint-disable-next-line no-undef
      const formData = new FormData(form);
  
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
  
      requester.doPost({
        url: router.getStandaloneUrl("/feedback"),
        data: formObject,
      })
      .then(() => {
        form.reset();
        toasts.publish({
          message: i18n.get("uploadSuccess"),
          type: "success",
        });
        events.trigger("pageFeedback:reload");
      })
      .catch((error) => {
        // eslint-disable-next-line no-undef
        console.error("ERROR: " + JSON.stringify(error));
      })
    };
  
    return (
     <div>
      <form onSubmit={onSubmit} className="env-form" encType="multipart/form-data">
     
        <div className="env-form-element">
        <label htmlFor="feedback" className="env-form-element__label" >{i18n.get('feedback')}</label>
          <textarea 
          name="feedback" 
          type="text" 
          className="env-form-input"
          placeholder={i18n.get('feedbackPlaceholder')}
          rows="3"
          required>
          </textarea>
        </div>
        <div className="env-form-element">
          <button type="submit" className="env-button env-button--primary">
            {i18n.get("sendFeedback")}
          </button>
        </div>
      </form>
     </div>
    );
  };

FeedbackForm.propTypes = {
    message: PropTypes.string,
};

export default FeedbackForm;