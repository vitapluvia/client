// @flow
import * as React from 'react'
import * as Kb from '../../../common-adapters'

/*
 * This banner is used as part of a List2 in fs/row/rows.js, so it's important
 * to keep height stable, thus all the height/minHeight/maxHeight in styles.
 * Please make sure the height is still calculated in getHeight when layout
 * changes.
 *
 */
export const height = 56

type Props = {
  onRetry: () => void,
}

const Banner = (props: Props) => (
  <Kb.Banner
    text="You are out of storage space and some folders could not be properly synced. Make some space and"
    color="red"
    actions={[{onClick: props.onRetry, title: 'retry the sync.'}]}
  />
)

export default Banner
