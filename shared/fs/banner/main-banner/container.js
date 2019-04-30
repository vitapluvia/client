// @flow
import * as React from 'react'
import Banner, {height} from './index'
import * as FsGen from '../../../actions/fs-gen'
import {isMobile, namedConnect} from '../../../util/container'
import * as RowTypes from '../../row/types'
import flags from '../../../util/feature-flags'

type OwnProps = {||}

const mapStateToProps = state => ({
  _offline: flags.kbfsOfflineMode && !state.fs.kbfsDaemonStatus.online,
  _outOfSpace: false,
})

const mapDispatchToProps = dispatch => ({
  // TODO: set this to a "retry sync" action
  onRetry: () => dispatch(FsGen.createDriverEnable({})),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  bannerType: stateProps._offline ? 'offline' : stateProps._outOfSpace ? 'out-of-space' : 'none',
  onRetry: dispatchProps.onRetry,
})

const ConnectedBanner = namedConnect<OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  'MainBanner'
)(Banner)

export default ConnectedBanner

export const asRows = !isMobile
  ? (): Array<RowTypes.HeaderRowItem> => []
  : (): Array<RowTypes.HeaderRowItem> => [
      {
        height, // TODO: get height correctly
        key: 'main-banner',
        node: <ConnectedBanner />,
        rowType: 'header',
      },
    ]
