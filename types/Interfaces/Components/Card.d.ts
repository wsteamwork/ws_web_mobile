import {MomentInput} from 'moment';
import {GridSize, GridSpacing, GridItemsAlignment} from '@material-ui/core/Grid';
import {CustomClasses} from '@/types/Interfaces/CustomInterface';
import {ReactNode} from 'react';

type IndexMainCardClasses = 'image' | 'title' | 'boxTitle' | 'maskBackground'| 'subTitle';

export interface ICardIntro extends CustomClasses<IndexMainCardClasses> {
  /**
   * Placement of card content
   * @default 'outside'
   */
  cardStyle?: 'inside' | 'outside'

  /**
   * Image height
   */
  imgHeight?: number

  /**
   * Image alt
   */
  imgAlt?: string

  /**
   * Image source
   */
  imgSrc?: string

  /**
   * Image max height
   */
  maxHeight?: number

  /**
   * Content of chip text
   */
  chipText?: string

  /**
   * Description for card
   */
  description?: ReactNode

  /**
   * Card title
   */
  title?: string

  /**
   * Card show time
   */
  time?: MomentInput
  /**
   * Ratio between image and content
   * @default {}
   */
  rootSpacing?: GridSpacing

  /**
   * Card content align-item
   * @default 'stretch'
   */
  contentAlign?: GridItemsAlignment
}
