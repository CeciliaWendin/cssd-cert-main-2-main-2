import * as React from "react";
import PropTypes from "prop-types";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import FeedbackList from "../FeedbackList/FeedbackList";


const App = ( {feedback, isAdmin} ) => {

  return (
    <div>
          < FeedbackForm />


        {isAdmin ? (
          feedback.map((f) =>
            <FeedbackList key={f.dsid} feedback={f.feedback} userId={f.userName} pageURI={f.page} isOutdated={f.isOutdated}></FeedbackList>
          ) ) : <></>
        }
    </div>
  );
};

App.propTypes = {

  feedback: PropTypes.array,
  isAdmin: PropTypes.bool,
 
};

export default App;
