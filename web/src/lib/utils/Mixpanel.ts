import mixpanel, { Dict } from 'mixpanel-browser';

const enabled = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
// console.log('enabled:', enabled);
export const Mixpanel = {
  identify: (id: string) => {
    if (enabled) mixpanel.identify(id);
  },
  track: (name: string, props?: Dict & { result?: string }) => {
    if (enabled) mixpanel.track(name, props);
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    },
  },
};
