import React from 'react'
import { HomeOutlined, SaveOutlined, ShrinkOutlined } from '@ant-design/icons'
import { IEnum } from '.'

/**
 * Page constants
 * @author tree
 */
export class Page implements IEnum<Page> {
  /**
   * For values() array
   */
  private static _values = new Array<Page>()

  public static readonly TOP = new Page(
    1,
    'Top',
    'Top page',
    'Top page | sample',
    'Feat typescript and next.js and redux and material-ui !!',
    '/',
    HomeOutlined,
    '#9cb160'
  )
  public static readonly REDUX = new Page(
    2,
    'Redux',
    'Redux sample',
    'Redux sample | sample',
    'Basic redux examples with typescript-fsa and immer.',
    '/redux',
    SaveOutlined,
    '#9cb160'
  )
  public static readonly REDUX_SAGAA = new Page(
    3,
    'Redux Saga',
    'Redux Saga sample',
    'Redux Saga sample | sample',
    'Basic redux-saga examples with typescript-fsa and immer.',
    '/redux-saga',
    ShrinkOutlined,
    '#9cb160'
  )
  public static readonly ABOUT = new Page(
    10,
    'About',
    'About this site',
    'About | sample',
    'Site about page.',
    '/about',
    ShrinkOutlined,
    '#9cb160'
  )
  public static readonly ERROR = new Page(
    99,
    'Error',
    'Error',
    'Error | sample',
    'Error.',
    '/error',
    ShrinkOutlined,
    '#9cb160'
  )

  /**
   * constructor
   * @param number page id
   * @param pageTitle page title
   * @param pageDescription page description
   * @param title seo title
   * @param metaDescription seo meta description
   * @param relativeUrl relative url
   * @param icon page icon
   * @param iconColor page icon color
   */
  private constructor(
    public readonly id: number,
    public readonly pageTitle: string,
    public readonly pageDescription: string,
    public readonly title: string,
    public readonly metaDescription: string,
    public readonly relativeUrl: string,
    public readonly icon: React.ComponentType<any>,
    public readonly iconColor: any
  ) {
    Page._values.push(this)
  }

  /**
   * Instance array
   */
  static get values(): Page[] {
    return this._values
  }

  /**
   * @inheritdoc
   */
  equals = (target: Page): boolean => this.id === target.id

  /**
   * @inheritdoc
   */
  toString = (): string =>
    `${this.id}, ${this.pageTitle}, ${this.pageDescription}`
}
