import mixpanel from 'mixpanel-browser';

const enabled = process.env.MIXPANEL_TOKEN;
console.log('enabled:', enabled);
export const Mixpanel = {
  // mixpanel.track:("A user is trying to connect!")
};
