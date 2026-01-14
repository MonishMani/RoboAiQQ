import React from 'react';
import Stepper, { Step } from './Stepper';
import './WeRrcmJourney.css';

function WeRrcmJourney() {
  return (
    <section className="wrrcm-journey">
      <div className="journey-header">
        <h2>Your Robotics Journey</h2>
        <p>A step-by-step roadmap from absolute beginner to robot builder</p>
      </div>

      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(`Step ${step}`);
        }}
        onFinalStepCompleted={() => console.log("Journey completed!")}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        <Step>
          <h2>Electronics Basics</h2>
          <p>Master circuits, breadboards, and fundamental electronic components</p>
        </Step>
        <Step>
          <h2>Sensors & Coding</h2>
          <p>Learn Arduino programming and integrate various sensors</p>
        </Step>
        <Step>
          <h2>Motors & Actuators</h2>
          <p>Control motors, servos, and mechanical systems</p>
        </Step>
        <Step>
          <h2>Complete Robot Build</h2>
          <p>Design and build your own fully functional robot</p>
        </Step>
      </Stepper>
    </section>
  );
}

export default WeRrcmJourney;
