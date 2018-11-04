
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import './index.less'
import { withInfo } from '@storybook/addon-info'
import { text, color } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import ColorButton from './ColorButton'
import UserMenu from '@components/GISTools/UserMenu'
storiesOf('Demo', module)
  .add(
    'ColorButton with text',
    withInfo('描述信息')(() => (
      <ColorButton color={text('color', 'green')}>Color Button</ColorButton>
    )),
  )
  .add(
    'ColorButton with color panel',
    withInfo(`import ColorButton from './ColorButton'`)(() => (
      
      <ColorButton color={color('color', 'green')}>Color Button</ColorButton>
    )),
  )
  .add('userMenu', withInfo(`import UserMenu from '@components/GISTools/UserMenu'`)(() => (
    <UserMenu onClick={action('clicked')}/>
  )))
