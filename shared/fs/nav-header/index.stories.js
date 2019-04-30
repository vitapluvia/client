// @flow
import React from 'react'
import {isMobile} from '../../constants/platform'
import * as Types from '../../constants/types/fs'
import * as Sb from '../../stories/storybook'
import {commonProvider} from '../common/index.stories'
import Nav2Header from '../../router-v2/header'
import Title from './title-container'
import Actions from './actions'
import MobileHeader from './mobile-header'

export const headerProvider = {
  NavHeaderMobile: ({onBack, path}: {onBack: () => void, path: Types.Path}) => ({
    onBack,
    path,
  }),
  NavHeaderTitle: ({path}: {path: Types.Path}) => ({
    onOpenPath: Sb.action('onOpenPath'),
    path,
  }),
}

const provider = Sb.createPropProviderWithCommon({
  ...commonProvider,
  ...headerProvider,
})

const TestWrapper = ({path, offline}: {path: Types.Path, offline?: ?boolean}) =>
  isMobile ? (
    <MobileHeader path={path} onBack={Sb.action('onBack')} />
  ) : (
    <Nav2Header
      allowBack={true}
      onPop={Sb.action('onPop')}
      options={{
        headerRightActions: () => <Actions path={path} onTriggerFilterMobile={() => {}} />,
        headerTitle: () => <Title path={path} />,
      }}
    />
  )

const addStories = story =>
  [
    '/keybase',
    '/keybase/team',
    '/keybase/team/kbkbfstest',
    '/keybase/team/kbkbfstest/folder',
    '/keybase/team/kbkbfstest/folder/pic.jpg',
  ].forEach(pathStr => story.add(pathStr, () => <TestWrapper path={Types.stringToPath(pathStr)} />))

export default () => {
  addStories(Sb.storiesOf('Files/NavHeaders', module).addDecorator(provider))
}
