import * as React from 'react';
import PropTypes from 'prop-types';
//import styles from './Feedback.scss';
import i18n from '@sitevision/api/common/i18n';

const FeedbackList = ({ feedback, userName, isOutdated }) => {
    return (
      <article className="env-card env-block env-shadow env-m-bottom--small">
        <div className="env-card__body">
          <p className="env-card__text" aria-hidden>
            {feedback}
          </p>
          <div className="env-card__footer">
            <p className="env-card__text env-ui-text-caption">
              {i18n.get("feedbackFrom")}            
                {userName}
            </p>
            {isOutdated ? (
            <p className="env-card__text env-ui-text-caption env-text--attention">{i18n.get("isOutdated")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </article>
    );
  };
  
  FeedbackList.propTypes = {
    userName: PropTypes.string,
    feedback: PropTypes.string,
    pageName: PropTypes.string,
    isOutdated: PropTypes.bool
  };
  
  
  export default FeedbackList;