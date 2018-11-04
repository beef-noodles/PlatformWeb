import { configure, setAddon,addDecorator } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'
import { withKnobs } from '@storybook/addon-knobs/react';
import { cyan } from 'ansi-colors';
addDecorator(withKnobs);
setOptions({
    name: 'SummitWeb基础组件',
    url: 'https://andorlab.summit.com',
    // goFullScreen: false,
    // showStoriesPanel: true,
    // showAddonPanel: true,
    // showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true
});
setDefaults({
    inline: true,
    header: true,
    source: true,
    styles: {
      header: {
        h1: {
          color: 'red'
        },
        h2: {
          color: '#1890ff'
        }
      }
    },
    maxPropsIntoLine: 1
    // propTablesExclude: [ReadmeContainer, DefaultPreview]
});

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
setAddon(infoAddon);

configure(loadStories, module);
