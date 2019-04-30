// @flow
import * as React from 'react'
import * as Kb from '../../../common-adapters'

type BannerType = 'out-of-space' | 'offline' | 'none'

/*
 * This banner is used as part of a List2 in fs/row/rows.js, so it's important
 * to keep height stable, thus all the height/minHeight/maxHeight in styles.
 * Please make sure the height is still calculated in getHeight when layout
 * changes.
 *
 */
// TODO: make this height function with all three varieties of banner
export const height = 56

type Props = {
  onRetry: () => void,
  bannerType: BannerType,
}

const Banner = (props: Props) =>
  props.bannerType === 'none' ? null : props.bannerType === 'offline' ? (
    <Kb.Banner text="You are offline." color="blue" />
  ) : (
    <Kb.Banner
      text="You are out of storage space and some folders could not be properly synced. Make some space and"
      color="red"
      actions={[{onClick: props.onRetry, title: 'retry the sync.'}]}
    />
  )

export default Banner
