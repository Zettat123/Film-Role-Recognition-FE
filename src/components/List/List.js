/* eslint-disable */
import React from 'react'
import cx from 'classnames'
import ListTitle from './ListTitle'
import ListItem from './ListItem'
import styles from './List.scss'

const List = ({
  className,
  listTitle,
  listData,
  selectVideo,
  changeVideoSource,
}) => (
  <div className={cx(className, styles.root)}>
    <ListTitle listTitle={listTitle} />
    <div className={styles.listBody}>
      {listData.map(({ title, name, image, video }, index) => (
        <ListItem
          className={styles.listItem}
          key={`${index}-${title}`}
          title={title}
          name={name}
          image={image}
          video={video}
          selectVideo={selectVideo}
          changeVideoSource={changeVideoSource}
        />
      ))}
    </div>
  </div>
)

export default List
